package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistLinkerProjection;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Used to get the existing artists and create the new artists from the database.
 */
@Component
public class ArtistIntegrationManager {

    private final CacheManager cacheManager;

    private final ArtistDAO artistDAO;

    public ArtistIntegrationManager(CacheManager cacheManager, ArtistDAO artistDAO) {
        this.cacheManager = cacheManager;
        this.artistDAO = artistDAO;
    }

    /**
     * Adding in the cache all the artist name with the associated ID in the database.
     *
     * @param artistsNames The name of the artist.
     */
    public void addArtistToCache(Set<String> artistsNames) {
        // Removing from the set the artist that are already in the cache.
        removeEntitiesAlreadyInCache(artistsNames);
        // Getting the element in the database and adding them to the cache.
        List<ArtistLinkerProjection> artistsInfo = artistDAO.getArtistByNames(artistsNames);

        final Cache artistCache = CacheEnum.getCache(CacheEnum.ARTIST_ID_BY_NAME, cacheManager);

        // Adding the artists into the cache.
        for (ArtistLinkerProjection artistInfo : artistsInfo) {
            artistCache.put(artistInfo.getArtistName(), artistInfo.getArtistId());
        }
    }

    /**
     * Remove from a list all the entities that are already in the cache.
     *
     * @param artistsNames The set containing the artists names.
     */
    private void removeEntitiesAlreadyInCache(Set<String> artistsNames) {
        // The list of the names that will be removed from the set.
        final List<String> removedArtists = new ArrayList<>();

        final Cache artistCache = CacheEnum.getCache(CacheEnum.ARTIST_ID_BY_NAME, cacheManager);
        for (String artistName : artistsNames) {
            if (artistCache.get(artistName) != null) {
                removedArtists.add(artistName);
            }
        }

        // Remove all the element in the cache.
        removedArtists.forEach(artistsNames::remove);
    }
}
