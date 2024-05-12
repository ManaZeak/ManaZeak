package org.manazeak.manazeak.manager.library.integration;

import jakarta.persistence.EntityManager;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistFolderExtractorHelper;
import org.manazeak.manazeak.manager.library.integration.cache.CacheIntegrationInitializer;
import org.manazeak.manazeak.util.database.transaction.AutonomousTransactionManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * Integrate the data contains in the track tags into the database.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class LibraryIntegrationManager {

    private final CacheManager cacheManager;
    private final IntegrationBufferManager integrationBufferManager;
    private final EntityManager entityManager;
    private final CacheIntegrationInitializer cacheIntegrationInitializer;
    private final AutonomousTransactionManager autonomousTransactionManager;
    /**
     * The number of artist folder that will be integrated by thread.
     */
    @Value("${app.bufferLength}")
    private int bufferSize;


    /**
     * Integrate the data that has been marked as changed.
     *
     * @param artists The list of folder containing artists.
     */
    public void integrateScannedLibrary(List<ScannedArtistDto> artists) {
        // Clearing all the data contained in the caches.
        clearAllIntegrationCaches();
        // Adding the data needed to complete the integration.
        cacheIntegrationInitializer.initCacheIntegration();

        // Creating the task executor.
        try (final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            CompletionService<List<ExtractedBandDto>> completionService = new ExecutorCompletionService<>(executor);
            int startIndex = 0;
            int numberOfPackage = 1;
            int totalNumberOfPackages = (int) Math.ceil((double) artists.size() / bufferSize);
            // Splitting the list in multiple lists.
            for (int endIndex = bufferSize; endIndex <= artists.size(); endIndex += bufferSize) {
                // Launch the integration of the sub element of the list.
                completionService.submit(launchArtistFoldersIntegration(artists.subList(startIndex, endIndex), numberOfPackage, totalNumberOfPackages));
                startIndex = endIndex;
                numberOfPackage++;
            }

            // Checking if the is any artists left in the integration buffer not processed.
            if (startIndex < artists.size()) {
                // There is some artist not processed.
                completionService.submit(launchArtistFoldersIntegration(artists.subList(startIndex, artists.size()), numberOfPackage, totalNumberOfPackages));
            }
            // No more job accepted.
            executor.shutdown();

            // Waiting for each thread to finish and complete the process in a synchronous way.
            processThreadResults(completionService, totalNumberOfPackages);
        }
        // Flushing all the modification of the database.
        entityManager.flush();
        clearAllIntegrationCaches();
    }

    /**
     * Process the threads results synchronously when the process is finished.
     *
     * @param completionService The service giving the threads results.
     * @param numberOfPackages  The number of packages done for the track integration.
     */
    private void processThreadResults(@NonNull final CompletionService<List<ExtractedBandDto>> completionService, final int numberOfPackages) {
        for (int i = 0; i < numberOfPackages; ++i) {
            final int finalI = i;
            // Creating transaction for each insert in the database.
            autonomousTransactionManager.runInTransaction(() -> {
                try {
                    log.info("Waiting for the next tag extraction thread to finish.");
                    // Launch the integration of the artist data.
                    integrationBufferManager.integrateBuffer(completionService.take().get(), finalI, numberOfPackages);
                } catch (ExecutionException e) {
                    log.error("Error while integrating the scanned track results into the database.", e);
                } catch (InterruptedException e) {
                    log.error("The thread has been interrupted, this is not normal.", e);
                    Thread.currentThread().interrupt();
                }
            });
        }
    }

    /**
     * Launch the integration process for a list of artists.
     *
     * @param artistFolders A list of artists folder to process.
     * @return The runnable to launch the integration into the thread pool.
     */
    private Callable<List<ExtractedBandDto>> launchArtistFoldersIntegration(final List<ScannedArtistDto> artistFolders,
                                                                            final int currentPackageNumber, final int totalPackageNumber) {
        return () -> {
            log.info("Processing the {} / {} package.", currentPackageNumber, totalPackageNumber);

            // Launch the tag extraction of the artist.
            List<ExtractedBandDto> bands = new ArrayList<>();
            log.info("Starting the extraction for the package  {}/{}.", currentPackageNumber, totalPackageNumber);
            for (ScannedArtistDto artistFolder : artistFolders) {
                bands.add(ArtistFolderExtractorHelper.extractArtistFolder(artistFolder));
            }
            log.info("Finished the tag extractions for the package {}/{}.", currentPackageNumber, totalPackageNumber);

            return bands;
        };
    }

    /**
     * Delete all the data that is contained inside the cache in case the cache is not empty.
     */
    private void clearAllIntegrationCaches() {
        // The list of the caches that needs to be cleared.
        CacheEnum[] caches = {CacheEnum.ARTIST_ID_BY_NAME, CacheEnum.ALBUM_ID_BY_LOCATION, CacheEnum.LABEL_ID_BY_NAME,
                CacheEnum.GENRE_ID_BY_NAME, CacheEnum.RECORDING_LOCATION_ID_BY_NAME, CacheEnum.KEY_ID_BY_NAME};
        // Clearing each cache.
        for (CacheEnum cache : caches) {
            CacheEnum.getCache(cache, cacheManager).invalidate();
        }
    }
}
