package org.manazeak.manazeak.manager.library.integration;

import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.cache.CacheIntegrationInitializer;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Integrate a buffer of scanned tracks into the database.
 */
@Component
public class IntegrationBufferManager {

    private final ArtistIntegrationManager artistIntegrationManager;

    private final CacheIntegrationInitializer cacheIntegrationInitializer;

    private final CacheAccessManager cacheAccessManager;

    public IntegrationBufferManager(ArtistIntegrationManager artistIntegrationManager,
                                    CacheIntegrationInitializer cacheIntegrationInitializer,
                                    CacheAccessManager cacheAccessManager) {
        this.artistIntegrationManager = artistIntegrationManager;
        this.cacheIntegrationInitializer = cacheIntegrationInitializer;
        this.cacheAccessManager = cacheAccessManager;
    }

    /**
     * Integrate a buffer of tracks into the database.
     *
     * @param bands The information about the extracted tags.
     */
    public void integrateBuffer(List<ExtractedBandDto> bands) {
        // Init caches with the buffer.
        cacheIntegrationInitializer.initCacheWithBuffer(bands);

        LibraryIntegrationHelper integrationHelper = new LibraryIntegrationHelper(cacheAccessManager);

        // Iterating over the objects of the buffer to create the object to be inserted into the database.
        for (ExtractedBandDto band : bands) {
            // Extracting the information from the band.
            integrationHelper.convertBandIntoDto(band);
            for (ExtractedAlbumDto album : band.getAlbums()) {

                for (ExtractedTrackDto track : album.getTracks()) {
                    integrationHelper.convertTrackIntoDto(track);
                }
            }
        }

        // Launching the integration of objects.
        artistIntegrationManager.mergeArtistsIntoDatabase(integrationHelper.getArtistIntegrationHelper().getArtists());
    }

}
