package org.manazeak.manazeak.constant.management;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Contains the type handled by the configuration in the database.
 */
@Getter
@RequiredArgsConstructor
public enum ConfigurationTypeEnum {
    BOOLEAN(Boolean.class),
    STRING(String.class),
    INTEGER(Integer.class);

    private final Class<?> targetClass;

}
