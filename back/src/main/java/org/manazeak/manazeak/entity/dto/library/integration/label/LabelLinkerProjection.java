package org.manazeak.manazeak.entity.dto.library.integration.label;

import org.manazeak.manazeak.entity.dto.library.integration.CacheObject;

/**
 * Contains the information about an album needed to be inserted in the cache.
 */
public interface LabelLinkerProjection extends CacheObject {

    @Override
    default Long getId() {
        return getLabelId();
    }

    @Override
    default String getKey() {
        return getLabelName();
    }

    Long getLabelId();

    String getLabelName();
}
