package org.manazeak.manazeak.manager.library.integration.cache;

import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistIntegrationCacheManager;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistIntegrationManager;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Initialise all the caches need for the integration of the library.
 */
@Component
public class CacheIntegrationInitializer {

    /**
     * The integration manager for the artists.
     */
    private final ArtistIntegrationManager artistIntegrationManager;

    private final ArtistIntegrationCacheManager artistIntegrationCacheManager;

    public CacheIntegrationInitializer(ArtistIntegrationManager artistIntegrationManager, ArtistIntegrationCacheManager artistIntegrationCacheManager) {
        this.artistIntegrationManager = artistIntegrationManager;
        this.artistIntegrationCacheManager = artistIntegrationCacheManager;
    }

    /**
     * Initialise the caches needed by the integration.
     *
     * @param bands The information about the extracted tags.
     */
    public void initCacheWithBuffer(List<ExtractedBandDto> bands) {
        Set<String> artistsNames = new HashSet<>();
        Set<String> albumsNames = new HashSet<>();

        // Iterating through the bands.
        for (ExtractedBandDto band : bands) {
            artistsNames.add(band.getName());
            for (ExtractedAlbumDto album : band.getAlbums()) {
                albumsNames.add(album.getTitle());
                for (ExtractedTrackDto track : album.getTracks()) {
                    // Adding the artists from the track.
                    artistIntegrationManager.extractArtistNameFromExtractedTrack(track, artistsNames);
                }
            }
        }

        // Getting the artists in the database that are not present inside the cache.
        artistIntegrationCacheManager.addElementsFromDatabaseToCache(artistsNames);
        // Getting the albums in the database that are not present inside the cache.

    }

}
