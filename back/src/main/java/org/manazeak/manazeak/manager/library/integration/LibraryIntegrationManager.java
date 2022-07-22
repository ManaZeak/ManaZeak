package org.manazeak.manazeak.manager.library.integration;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.manager.library.track.ArtistFolderExtractorHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * Integrate the data contains in the track tags into the database.
 */
@Component
public class LibraryIntegrationManager {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryIntegrationManager.class);
    private final CacheManager cacheManager;
    private final IntegrationBufferManager integrationBufferManager;
    private final EntityManager entityManager;
    /**
     * The number of artist folder that will be integrated by thread.
     */
    @Value("${app.bufferLength}")
    private int bufferSize;

    @Autowired
    public LibraryIntegrationManager(CacheManager cacheManager, IntegrationBufferManager integrationBufferManager, EntityManager entityManager) {
        this.cacheManager = cacheManager;
        this.integrationBufferManager = integrationBufferManager;
        this.entityManager = entityManager;
    }

    /**
     * Integrate the data that has been marked as changed.
     *
     * @param artists The list of folder containing artists.
     */
    public void integrateScannedLibrary(List<ScannedArtistDto> artists) {
        // Clearing all the data contained in the caches.
        clearAllIntegrationCaches();

        final ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.LIBRARY_SCAN_THREAD_NUMBER);

        int startIndex = 0;
        List<Future<?>> threads = new ArrayList<>();
        // Splitting the list in multiple lists.
        for (int endIndex = bufferSize; endIndex <= artists.size(); endIndex += bufferSize) {
            // Launch the integration of the sub element of the list.
            threads.add(executor.submit(launchArtistFoldersIntegration(artists.subList(startIndex, endIndex))));
            startIndex = endIndex;
        }

        // Checking if the is any artists left in the integration buffer not processed.
        if (startIndex < artists.size()) {
            // There is some artist not processed.
            threads.add(executor.submit(launchArtistFoldersIntegration(artists.subList(startIndex, artists.size()))));
        }
        // No more job accepted.
        executor.shutdown();

        try {
            synchronized (this) {
                for (Future<?> thread : threads) {
                    thread.get();
                }
                LOG.error("ALL THREAD ARE DONE.");
            }/*
            // Waiting for all the jobs to finish.
            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                LOG.error("The thread executor was terminated by the thread pool timeout.");
            }*/
        } catch (InterruptedException e) {
            LOG.warn("The integration thread interrupted.", e);
            Thread.currentThread().interrupt();
        } catch (ExecutionException e) {
            LOG.warn("The integration thread interrupted.", e);
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
    private Runnable launchArtistFoldersIntegration(final List<ScannedArtistDto> artistFolders) {
        return () -> {
            try {
                LOG.error("WAITING A BIT");
                // Launch the tag extraction of the artist.
                List<ExtractedBandDto> bands = new ArrayList<>();
                for (ScannedArtistDto artistFolder : artistFolders) {
                    LOG.error("Launching the extraction of {}", artistFolder.getArtistFolder());
                    bands.add(ArtistFolderExtractorHelper.extractArtistFolder(artistFolder));
                }

                // Launch the integration of the artist data.
                integrationBufferManager.integrateBuffer(bands);
                LOG.error("END THREAD.");
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
        CacheEnum[] caches = {CacheEnum.ARTIST_ID_BY_NAME, CacheEnum.ALBUM_ID_BY_TITLE, CacheEnum.LABEL_ID_BY_NAME};
        // Clearing each cache.
        for (CacheEnum cache : caches) {
            CacheEnum.getCache(cache, cacheManager).invalidate();
        }
    }
}
