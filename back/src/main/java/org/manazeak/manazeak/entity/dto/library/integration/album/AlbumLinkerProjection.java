package org.manazeak.manazeak.entity.dto.library.integration.album;

import org.manazeak.manazeak.entity.dto.library.integration.CacheObject;

/**
 * Contains the information about an album needed to be inserted in the cache.
 */
public interface AlbumLinkerProjection extends CacheObject {

    @Override
    default Long getId() {
        return getAlbumId();
    }

    @Override
    default String getKey() {
        return getAlbumLocation();
    }

    Long getAlbumId();

    String getAlbumLocation();
}
