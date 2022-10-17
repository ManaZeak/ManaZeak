package org.manazeak.manazeak.manager.library.integration.genre;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenreLinkerProjection;
import org.manazeak.manazeak.manager.library.integration.cache.AbstractIntegrationCacheLoaderManager;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Allows to load the cache with the data that is present inside the database.
 */
@Component
public class GenreIntegrationCacheManager extends AbstractIntegrationCacheLoaderManager<GenreLinkerProjection> {

    private final CacheManager cacheManager;

    private final GenreDAO genreDao;

    public GenreIntegrationCacheManager(CacheManager cacheManager, GenreDAO genreDao) {
        this.cacheManager = cacheManager;
        this.genreDao = genreDao;
    }

    @Override
    protected List<GenreLinkerProjection> getDatabaseObjects(List<String> elements) {
        return genreDao.getGenreByNames(elements);
    }

    @Override
    protected Cache getCache() {
        return CacheEnum.getCache(CacheEnum.GENRE_ID_BY_NAME, cacheManager);
    }
}
