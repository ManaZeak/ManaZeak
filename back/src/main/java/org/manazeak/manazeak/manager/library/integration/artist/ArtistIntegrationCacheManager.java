package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistLinkerProjection;
import org.manazeak.manazeak.manager.library.integration.cache.AbstractIntegrationCacheLoaderManager;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Manager used to manipulate the artists in the cache and in the database.
 */
@Component
public class ArtistIntegrationCacheManager extends AbstractIntegrationCacheLoaderManager<ArtistLinkerProjection> {

    private final CacheManager cacheManager;

    private final ArtistDAO artistDao;

    public ArtistIntegrationCacheManager(CacheManager cacheManager, ArtistDAO artistDao) {
        this.cacheManager = cacheManager;
        this.artistDao = artistDao;
    }

    @Override
    protected List<ArtistLinkerProjection> getObjects(List<String> elements) {
        return artistDao.getArtistByNames(elements);
    }

    @Override
    protected Cache getCache() {
        return CacheEnum.getCache(CacheEnum.ARTIST_ID_BY_NAME, cacheManager);
    }
}