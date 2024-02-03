package org.manazeak.manazeak.constant.management;

import com.google.common.collect.Maps;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.exception.MzkRuntimeException;

import java.util.List;
import java.util.Map;

/**
 * Contains the configuration keys of the application.
 */
@RequiredArgsConstructor
@Getter
public enum ConfigurationEnum {

    DEFAULT_LOGIN_ENABLED(1L, "admin.config.default_log", Boolean.FALSE.toString(), ConfigurationTypeEnum.BOOLEAN),
    DEFAULT_LOGIN(2L, "admin.config.default_login", "guest", ConfigurationTypeEnum.STRING),
    DEFAULT_PASSWORD(3L, "admin.config.default_password", "guest", ConfigurationTypeEnum.STRING);

    private static final Map<Long, ConfigurationEnum> LOOKUP = Maps.uniqueIndex(
            List.of(ConfigurationEnum.values()),
            ConfigurationEnum::getConfigId
    );

    private final Long configId;
    private final String code;
    private final String defaultValue;
    private final ConfigurationTypeEnum type;

    /**
     * Get the configuration key with its identifier.
     *
     * @param configId The configuration identifier.
     * @return The configuration if it exists.
     */
    public static ConfigurationEnum getConfigById(Long configId) {
        ConfigurationEnum config = LOOKUP.get(configId);
        if (config == null) {
            throw new MzkRuntimeException("The configuration key doesn't exist.");
        }

        return config;
    }
}
