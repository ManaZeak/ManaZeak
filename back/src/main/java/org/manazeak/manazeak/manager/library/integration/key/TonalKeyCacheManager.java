package org.manazeak.manazeak.manager.library.integration.key;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.reference.KeyDAO;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.manazeak.manazeak.manager.library.integration.cache.AbstractIntegrationCacheLoaderManager;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Used to interract with the tonal key cache. This cache is loaded once at the start of the integration.
 */
@Component
@RequiredArgsConstructor
public class TonalKeyCacheManager extends AbstractIntegrationCacheLoaderManager<NameIdentifierProjection> {

    private final CacheManager cacheManager;

    private final KeyDAO keyDAO;

    @Override
    protected List<NameIdentifierProjection> getDatabaseObjects(List<String> elements) {
        return keyDAO.getAll();
    }

    @Override
    protected Cache getCache() {
        return CacheEnum.getCache(CacheEnum.KEY_ID_BY_NAME, cacheManager);
    }
}
