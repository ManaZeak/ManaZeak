package org.manazeak.manazeak.service.management;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.management.ConfigurationEnum;
import org.manazeak.manazeak.daos.management.ConfigurationDAO;
import org.manazeak.manazeak.entity.dto.admin.configuration.ConfigurationDto;
import org.manazeak.manazeak.entity.management.Configuration;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.management.ConfigurationManager;
import org.manazeak.manazeak.mapper.management.ConfigurationMapper;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Allows interacting with the configuration of the application.
 */
@Service
@RequiredArgsConstructor
@TransactionalWithRollback
public class ConfigurationService implements InitializingBean {

    private final ConfigurationDAO configurationDAO;

    private final ConfigurationManager configurationManager;

    private final ConfigurationMapper configurationMapper;

    /**
     * Check if the key exists in the configuration.
     *
     * @param configKey The configuration key to fetch in the database.
     * @return True if the key exists.
     */
    public boolean isKeyExists(ConfigurationEnum configKey) {
        return configurationDAO.existsById(configKey.getConfigId());
    }


    /**
     * @return The list of all the configuration in the application.
     */
    public List<Configuration> getAllConfigurations() {
        return configurationDAO.findAll();
    }

    /**
     * Set a configuration key in the database.
     *
     * @param configuration The information on the configuration to send.
     */
    public void setKey(ConfigurationDto configuration) {
        // Getting the key if it exists in the database.
        Configuration config = configurationDAO.getConfigurationByConfigurationId(configuration.configurationId())
                .orElseThrow(
                        () -> new MzkRuntimeException("The configuration wasn't found in the database.")
                );
        // Setting the value.
        config.setValue(config.getValue());
        // When saving a merge request is done by Hibernate.
        configurationDAO.save(config);
    }

    /**
     * Get the configurations in the database matching the given configuration in the enum.
     *
     * @param configurations The configurations to get in the database.
     * @return The configurations associated to the configuration enum.
     */
    public Map<ConfigurationEnum, Configuration> getConfigs(Collection<ConfigurationEnum> configurations) {
        Set<Long> configIds = new HashSet<>();
        // Adding all the configuration ids to the set.
        configurations.forEach(c -> configIds.add(c.getConfigId()));

        // Getting the configs in the database.
        List<Configuration> dbConfigs = configurationDAO.getConfigurationsByConfigurationIdIsIn(configIds);

        // Associating the configurations in the database to the enum value.
        EnumMap<ConfigurationEnum, Configuration> configMap = new EnumMap<>(ConfigurationEnum.class);
        dbConfigs.forEach(c -> configMap.put(ConfigurationEnum.getConfigById(c.getConfigurationId()), c));

        return configMap;
    }

    /**
     * Get the value of the configuration converted to the right type.
     *
     * @param config The configuration object.
     * @param clazz  The class associated to the configuration.
     * @param <T>    The type of the returned configuration.
     * @return The value contained in the configuration.
     */
    public <T> T resolveConfiguration(Configuration config, @NonNull Class<T> clazz) {
        return configurationManager.resolveConfiguration(config.getValue(), clazz);
    }

    /**
     * Insert all the configuration keys missing in the database.
     */
    @Override
    public void afterPropertiesSet() {
        // Creating all the properties missing in the database.
        Set<Long> configurationIds = configurationDAO.getAllConfigurationIds();
        // Creating the missing configuration keys.
        for (ConfigurationEnum configuration : ConfigurationEnum.values()) {
            if (!configurationIds.contains(configuration.getConfigId())) {
                // Creating the configuration.
                configurationDAO.save(configurationMapper.fromConfigurationEnum(configuration));
            }
        }
    }
}
