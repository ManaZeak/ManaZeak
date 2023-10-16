package org.manazeak.manazeak.manager.library.integration.label;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.LabelDAO;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.manazeak.manazeak.manager.library.integration.cache.AbstractIntegrationCacheLoaderManager;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LabelIntegrationCacheManager extends AbstractIntegrationCacheLoaderManager<NameIdentifierProjection> {

    private final LabelDAO labelDao;

    private final CacheManager cacheManager;

    @Override
    protected List<NameIdentifierProjection> getDatabaseObjects(List<String> elements) {
        return labelDao.getLabelsByNames(elements);
    }

    @Override
    protected Cache getCache() {
        return CacheEnum.getCache(CacheEnum.ALBUM_ID_BY_LOCATION, cacheManager);
    }
}
