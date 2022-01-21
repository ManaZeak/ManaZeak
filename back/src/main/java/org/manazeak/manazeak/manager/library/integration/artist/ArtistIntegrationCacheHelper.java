package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Helper used to manipulate the artists in the cache and in the database.
 */
public final class ArtistIntegrationCacheHelper {

    private ArtistIntegrationCacheHelper() {
    }


    /**
     * Remove from a list all the entities that are already in the cache.
     *
     * @param artistsNames The set containing the artists names.
     */
    public static void removeEntitiesAlreadyInCache(Set<String> artistsNames, CacheManager cacheManager) {
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