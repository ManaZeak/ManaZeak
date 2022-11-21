package org.manazeak.manazeak.manager.library.integration;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistFolderExtractorHelper;
import org.manazeak.manazeak.manager.library.integration.cache.CacheIntegrationInitializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Integrate the data contains in the track tags into the database.
 */
@Component
@RequiredArgsConstructor
public class LibraryIntegrationManager {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryIntegrationManager.class);
    private final CacheManager cacheManager;
    private final IntegrationBufferManager integrationBufferManager;
    private final EntityManager entityManager;
    private final CacheIntegrationInitializer cacheIntegrationInitializer;
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

        final ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.LIBRARY_SCAN_THREAD_NUMBER);

        int startIndex = 0;
        int numberOfPackage = 1;
        int totalNumberOfPackages = (int) Math.ceil((double) artists.size() / bufferSize);
        // Splitting the list in multiple lists.
        for (int endIndex = bufferSize; endIndex <= artists.size(); endIndex += bufferSize) {
            // Launch the integration of the sub element of the list.
            executor.submit(launchArtistFoldersIntegration(artists.subList(startIndex, endIndex), numberOfPackage, totalNumberOfPackages));
            startIndex = endIndex;
            numberOfPackage++;
        }

        // Checking if the is any artists left in the integration buffer not processed.
        if (startIndex < artists.size()) {
            // There is some artist not processed.
            executor.submit(launchArtistFoldersIntegration(artists.subList(startIndex, artists.size()), numberOfPackage, totalNumberOfPackages));
        }
        // No more job accepted.
        executor.shutdown();

        try {
            // Waiting for all the jobs to finish.
            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                LOG.error("The thread executor was terminated by the thread pool timeout.");
            }
        } catch (InterruptedException e) {
            LOG.warn("The integration thread interrupted.", e);
            Thread.currentThread().interrupt();
        }
        // Flushing all the modification of the database.
        entityManager.flush();
    }

    /**
     * Launch the integration process for a list of artists.
     *
     * @param artistFolders A list of artists folder to process.
     * @return The runnable to launch the integration into the thread pool.
     */
    private Runnable launchArtistFoldersIntegration(final List<ScannedArtistDto> artistFolders,
                                                    final int currentPackageNumber, final int totalPackageNumber) {
        return () -> {
            try {
                LOG.info("Processing the {} / {} package.", currentPackageNumber, totalPackageNumber);

                // Launch the tag extraction of the artist.
                List<ExtractedBandDto> bands = new ArrayList<>();
                LOG.info("Starting the extraction the tags from the tracks.");
                for (ScannedArtistDto artistFolder : artistFolders) {
                    bands.add(ArtistFolderExtractorHelper.extractArtistFolder(artistFolder));
                }
                LOG.info("Finished the tag extractions.");

                LOG.info("Starting the database insertion of the tags.");
                // Launch the integration of the artist data.
                integrationBufferManager.integrateBuffer(bands);
                LOG.info("Finished the database insertion.");
            } catch (Exception e) {
                LOG.error("An error occurred during the artist folder integration.", e);
            }
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
