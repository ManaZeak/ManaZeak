package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.controller.html.security.AdditionalRegisterInformationController;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;

import java.util.List;
import java.util.Optional;

public interface UserService {

    /**
     * Get the current user connected.
     * @return the current user.
     */
    MzkUser getCurrentUser();

    /**
     * Get a user in the database from the username.
     *
     * @param username the username of the user.
     * @return the user corresponding to the username.
     */
    Optional<MzkUser> findByUsername(final String username);

    /**
     * This function will prepare and insert into the database a user.
     *
     * @param userToCreate the user that will be created.
     * @return the created user.
     */
    MzkUser createUser(final NewUserDto userToCreate);

    /**
     * This function add the additional information about the user after the creation.
     * @param userInfo the user information to add to the user.
     */
    void addUserInformation(final UserFirstInfoDto userInfo);

    /**
     * Get the list of privileges of a username.
     *
     * @param username the username.
     * @return The list of privileges of a user.
     */
    List<Privilege> getPrivilegeByUsername(final String username);
}
