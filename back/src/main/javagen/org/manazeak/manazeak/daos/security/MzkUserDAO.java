package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Data Access Object for MzkUser using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface MzkUserDAO extends CrudRepository<MzkUser, Long> {

    /**
     * Get a user from the username.
     *
     * @param username exact username of the user.
     * @return the user.
     */
    Optional<MzkUser> getByUsername(String username);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT