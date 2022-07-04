package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.manager.library.integration.IntegrationBufferManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Allows to integrate the library into the database.
 */
@Component
public class LibraryIntegrationManager {

    private final CacheManager cacheManager;

    @Value("${app.bufferLength}")
    private int bufferSize;

    /**
     * The manager to integrate the buffer of the library.
     */
    private final IntegrationBufferManager integrationBufferManager;


    public LibraryIntegrationManager(CacheManager cacheManager, IntegrationBufferManager integrationBufferManager) {
        this.cacheManager = cacheManager;
        this.integrationBufferManager = integrationBufferManager;
    }

    /**
     * Insert the data extracted from the tracks into the database.
     *
     * @param extractedBands The list of the bands extracted from the tags and the FS.
     */
    public void insertLibraryData(List<ExtractedBandDto> extractedBands) {
        // Clear all the caches for the library integration.
        clearAllIntegrationCaches();

        List<ExtractedBandDto> bandsBuffer = new ArrayList<>();

        // Iterating through the tracks.
        for (ExtractedBandDto band : extractedBands) {
            // Extracting the information contained in the band.
            bandsBuffer.add(band);
            // Checking if the buffer must be integrated in the database.
            if (bandsBuffer.size() == bufferSize) {
                // Inserting the data into the database.
                integrationBufferManager.integrateBuffer(bandsBuffer);
                // Clear the bands
                bandsBuffer.clear();
            }
        }

        // Is the buffer is not empty, integrating the last elements.
        if (!bandsBuffer.isEmpty()) {
            integrationBufferManager.integrateBuffer(bandsBuffer);
        }
    }

    /**
     * Delete all the data that is contained inside the cache in case the cache is not empty.
     */
    private void clearAllIntegrationCaches() {
        // The list of the caches that needs to be cleared.
        CacheEnum[] caches = {CacheEnum.ARTIST_ID_BY_NAME, CacheEnum.ALBUM_ID_BY_TITLE};
        // Clearing each cache.
        for (CacheEnum cache : caches) {
            CacheEnum.getCache(cache, cacheManager).invalidate();
        }
    }
}
