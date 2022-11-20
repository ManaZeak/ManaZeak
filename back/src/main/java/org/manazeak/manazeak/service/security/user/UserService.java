package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
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
     * This function will prepare and insert into the database a user.
     *
     * @param userToCreate the user that will be created.
     * @return the created user.
     */
    MzkUser createUser(final NewUserDto userToCreate);

    /**
     * Get the list of privileges of a username.
     *
     * @param username the username.
     * @return The list of privileges of a user.
     */
    List<Privilege> getPrivilegeByUsername(final String username);

    /**
     * Change the password of the user in the application.
     *
     * @param newPassword The password information of the user.
     */
    void changeUserPassword(final ResetPasswordDto newPassword, final MzkUser user);

    /**
     * Change the password of a user.
     * @param resetUserPassword Contains the information about the user and the new password.
     */
    void changeUserPassword(final ResetUserPasswordDto resetUserPassword);

    /**
     * Check if a user is connected.
     *
     * @return True if the user is connected.
     */
    boolean isUserConnected();

    /**
     * Get all the user in a tree starting from JESUS.
     *
     * @return the tree containing all the users.
     */
    UserHierarchyDto getUserHierarchy();

    /**
     * Get all the users for displaying them in a list.
     *
     * @return The list of users.
     */
    List<UserListLineDto> getUserList();

    /**
     * Delete a user from the application.
     *
     * @param userId The id of the user that will be deleted.
     */
    void deleteUser(Long userId);

    /**
     * Deactivate a user of the application.
     *
     * @param userId The id of the user that will be deactivated.
     */
    void deactivateUser(Long userId);
}
