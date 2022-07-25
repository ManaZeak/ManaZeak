package org.manazeak.manazeak.manager.library.integration.album;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumLinkerProjection;
import org.manazeak.manazeak.manager.library.integration.cache.AbstractIntegrationCacheLoaderManager;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AlbumIntegrationCacheManager extends AbstractIntegrationCacheLoaderManager<AlbumLinkerProjection> {

    private final AlbumDAO albumDao;

    private final CacheManager cacheManager;

    public AlbumIntegrationCacheManager(AlbumDAO albumDao, CacheManager cacheManager) {
        this.albumDao = albumDao;
        this.cacheManager = cacheManager;
    }

    @Override
    protected List<AlbumLinkerProjection> getObjects(List<String> elements) {
        return albumDao.getAlbumsByTitles(elements);
    }

    @Override
    protected Cache getCache() {
        return CacheEnum.getCache(CacheEnum.ALBUM_ID_BY_TITLE, cacheManager);
    }
}
