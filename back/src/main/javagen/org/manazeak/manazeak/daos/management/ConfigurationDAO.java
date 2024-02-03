package org.manazeak.manazeak.daos.management;

import lombok.NonNull;
import org.manazeak.manazeak.entity.management.Configuration;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Data Access Object for Configuration using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface ConfigurationDAO extends CrudRepository<Configuration, Long> {

    /**
     * Override the default method to return a list instead of an iterable.
     *
     * @return The list of all the configurations.
     */
    @NonNull
    List<Configuration> findAll();

    /**
     * @return All the identifier of the configuration present in the database.
     */
    @Query("select configurationId from Configuration")
    Set<Long> getAllConfigurationIds();

    /**
     * Get a configuration by its configuration identifier.
     *
     * @param configurationId The identifier of the configuration.
     * @return The configuration if found.
     */
    Optional<Configuration> getConfigurationByConfigurationId(Long configurationId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT