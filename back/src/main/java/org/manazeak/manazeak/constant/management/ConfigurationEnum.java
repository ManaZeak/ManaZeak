package org.manazeak.manazeak.constant.management;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Contains the configuration keys of the application.
 */
@RequiredArgsConstructor
@Getter
public enum ConfigurationEnum {

    DEFAULT_LOGIN_ENABLED(1L, Boolean.FALSE.toString(), ConfigurationTypeEnum.BOOLEAN),
    DEFAULT_LOGIN(2L, "guest", ConfigurationTypeEnum.STRING),
    DEFAULT_PASSWORD(3L, "guest", ConfigurationTypeEnum.STRING);

    private final Long configId;
    private final String defaultValue;
    private final ConfigurationTypeEnum type;

}
