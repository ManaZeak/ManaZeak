package org.manazeak.manazeak.service.management;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.management.ConfigurationEnum;
import org.manazeak.manazeak.daos.management.ConfigurationDAO;
import org.manazeak.manazeak.entity.dto.admin.configuration.ConfigurationDto;
import org.manazeak.manazeak.entity.management.Configuration;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.mapper.management.ConfigurationMapper;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Allows interacting with the configuration of the application.
 */
@Service
@RequiredArgsConstructor
@TransactionalWithRollback
public class ConfigurationService implements InitializingBean {

    private final ConfigurationDAO configurationDAO;

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
        Configuration config = configurationDAO.findById(configuration.configurationId())
                .orElseThrow(
                        () -> new MzkRuntimeException("The configuration wasn't found in the database.")
                );
        // Setting the value.
        config.setValue(config.getValue());
        // When saving a merge request is done by Hibernate.
        configurationDAO.save(config);
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
