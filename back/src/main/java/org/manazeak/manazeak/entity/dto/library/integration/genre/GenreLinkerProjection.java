package org.manazeak.manazeak.entity.dto.library.integration.genre;

import org.manazeak.manazeak.entity.dto.library.integration.CacheObject;

/**
 * Contains the data needed to insert a genre into the database.
 */
public interface GenreLinkerProjection extends CacheObject {

    @Override
    default Long getId() {
        return getGenreId();
    }

    @Override
    default String getKey() {
        return getGenreName();
    }

    Long getGenreId();

    String getGenreName();
}

