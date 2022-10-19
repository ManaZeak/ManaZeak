package org.manazeak.manazeak.manager.library.integration.key;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.reference.KeyDAO;
import org.manazeak.manazeak.entity.dto.library.integration.key.KeyLinkerProjection;
import org.manazeak.manazeak.manager.library.integration.cache.AbstractIntegrationCacheLoaderManager;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Used to interract with the tonal key cache. This cache is loaded once at the start of the integration.
 */
@Component
public class TonalKeyCacheManager extends AbstractIntegrationCacheLoaderManager<KeyLinkerProjection> {

    private final CacheManager cacheManager;

    private final KeyDAO keyDAO;

    public TonalKeyCacheManager(CacheManager cacheManager, KeyDAO keyDAO) {
        this.cacheManager = cacheManager;
        this.keyDAO = keyDAO;
    }

    @Override
    protected List<KeyLinkerProjection> getDatabaseObjects(List<String> elements) {
        return keyDAO.getAll();
    }

    @Override
    protected Cache getCache() {
        return CacheEnum.getCache(CacheEnum.KEY_ID_BY_NAME, cacheManager);
    }
}
