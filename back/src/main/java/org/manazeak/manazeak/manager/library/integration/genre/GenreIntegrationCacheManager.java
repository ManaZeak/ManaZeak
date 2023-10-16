package org.manazeak.manazeak.manager.library.integration.genre;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.manazeak.manazeak.manager.library.integration.cache.AbstractIntegrationCacheLoaderManager;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Loads the cache with the data that is present inside the database.
 */
@Component
@RequiredArgsConstructor
public class GenreIntegrationCacheManager extends AbstractIntegrationCacheLoaderManager<NameIdentifierProjection> {

    private final CacheManager cacheManager;

    private final GenreDAO genreDao;


    @Override
    protected List<NameIdentifierProjection> getDatabaseObjects(List<String> elements) {
        return genreDao.getGenreByNames(elements);
    }

    @Override
    protected Cache getCache() {
        return CacheEnum.getCache(CacheEnum.GENRE_ID_BY_NAME, cacheManager);
    }
}
