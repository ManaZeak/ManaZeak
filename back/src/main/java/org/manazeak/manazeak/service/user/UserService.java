package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;

import java.util.List;
import java.util.Optional;

public interface UserService {

    /**
     * Get a user in the database from the username.
     *
     * @param username the username of the user.
     * @return the user corresponding to the username.
     */
    Optional<MzkUser> findByUsername(final String username);

    /**
     * Get the list of privileges of a username.
     *
     * @param username the username.
     * @return The list of privileges of a user.
     */
    List<Privilege> getPrivilegeByUsername(final String username);
}
