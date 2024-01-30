package org.manazeak.manazeak.entity.dto.admin.configuration;

/**
 * Contains a configuration to be saved in the application.
 *
 * @param configurationId The identification of the configuration.
 * @param value           The value of the configuration.
 */
public record ConfigurationDto(Long configurationId, String value) {
}
