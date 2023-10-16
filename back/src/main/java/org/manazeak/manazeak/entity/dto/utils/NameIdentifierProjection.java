package org.manazeak.manazeak.entity.dto.utils;

import org.manazeak.manazeak.entity.dto.library.integration.CacheObject;

/**
 * Associate a name and a identifier.
 */
public interface NameIdentifierProjection extends CacheObject {

    @Override
    default Long getId() {
        return getIdentifier();
    }

    @Override
    default String getKey() {
        return getName();
    }

    String getName();

    Long getIdentifier();
}
