package org.manazeak.manazeak.constant.management;

import com.google.common.collect.Maps;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private Optional<ConfigurationEnum> getConfigById(Long configId) {
        return Optional.ofNullable(LOOKUP.get(configId));
    }
}
