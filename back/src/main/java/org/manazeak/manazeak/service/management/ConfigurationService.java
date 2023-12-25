package org.manazeak.manazeak.service.management;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.management.ConfigurationEnum;
import org.manazeak.manazeak.daos.management.ConfigurationDAO;
import org.springframework.stereotype.Service;

/**
 * Allows interacting with the configuration of the application.
 */
@Service
@RequiredArgsConstructor
@TransactionalWithRollback
public class ConfigurationService {

    private final ConfigurationDAO configurationDAO;

    /**
     * Check if the key exists in the configuration.
     *
     * @param configKey The configuration key to fetch in the database.
     * @return True if the key exists.
     */
    public boolean isKeyExists(ConfigurationEnum configKey) {
        return configurationDAO.existsById(configKey.getConfigId());
    }


}
