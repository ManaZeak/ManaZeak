package org.manazeak.manazeak.manager.management;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.management.ConfigurationEnum;
import org.manazeak.manazeak.daos.management.ConfigurationDAO;
import org.manazeak.manazeak.entity.management.Configuration;
import org.manazeak.manazeak.mapper.management.ConfigurationMapper;
import org.springframework.data.util.CastUtils;
import org.springframework.stereotype.Component;

import java.util.Optional;

@RequiredArgsConstructor
@Component
@Slf4j
public class ConfigurationManager {

    private final ConfigurationDAO configurationDAO;

    private final ConfigurationMapper configurationMapper;

    /**
     * Resolve a string into the type specified by the configuration object.
     *
     * @param configValue The value of the configuration in the database.
     * @param clazz       The target class of the property.
     * @param <T>         The target type of the configuration.
     * @return The configuration stored in the database converted to the target type.
     */
    public <T> T resolveConfiguration(String configValue, @NonNull Class<T> clazz) {
        T value;

        // Avoid to convert null values.
        if (configValue == null) {
            return null;
        }

        // Choose the converter given the type of the element.
        if (String.class.equals(clazz)) {
            value = CastUtils.cast(configValue);
        } else if (Integer.class.equals(clazz)) {
            value = CastUtils.cast(Integer.valueOf(configValue));
        } else if (Boolean.class.equals(clazz)) {
            value = CastUtils.cast(Boolean.valueOf(configValue));
        } else {
            log.warn("The class '{}' isn't handled by the configuration resolver.", clazz);
            value = null;
        }

        return value;
    }

    /**
     * Get the configuration in the database or create in if it doesn't exist.
     *
     * @param configKey The configuration to get.
     * @return The configuration object.
     */
    public Configuration getOrCreateConfig(ConfigurationEnum configKey) {
        // Trying to fetch the configuration.
        Optional<Configuration> configuration = configurationDAO.findById(configKey.getConfigId());
        return configuration.orElseGet(
                // Inserting the configuration and returning it.
                () -> configurationDAO.save(configurationMapper.fromConfigurationEnum(configKey))
        );

    }

}
