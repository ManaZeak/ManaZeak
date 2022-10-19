package org.manazeak.manazeak.entity.dto.library.integration.key;

import org.manazeak.manazeak.entity.dto.library.integration.CacheObject;

public interface KeyLinkerProjection  extends CacheObject {

    @Override
    default Long getId() {
        return getKeyId();
    }

    @Override
    default String getKey() {
        return getLabel();
    }

    Long getKeyId();

    String getLabel();
}
