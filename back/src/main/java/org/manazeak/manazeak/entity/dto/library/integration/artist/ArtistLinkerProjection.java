package org.manazeak.manazeak.entity.dto.library.integration.artist;


import org.manazeak.manazeak.entity.dto.library.integration.CacheObject;

public interface ArtistLinkerProjection extends CacheObject {

    @Override
    default Long getId() {
        return getArtistId();
    }

    @Override
    default String getKey() {
        return getArtistName();
    }

    Long getArtistId();

    String getArtistName();
}
