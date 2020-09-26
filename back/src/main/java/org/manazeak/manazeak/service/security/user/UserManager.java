package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRestException;

import java.util.Optional;

/**
 * Manages the creation of user in the database.
 */
public interface UserManager {


    /**
     * Get the current user connected.
     *
     * @return the current user.
     */
    MzkUser getCurrentUser();

    /**
     * Insert a user from the front into the database.
     *
     * @return the user inserted.
     */
    MzkUser insertUser(NewUserDto newUser);

    /**
     * Save a user into the database.
     *
     * @param user The user that will be saved.
     */
    void saveUser(MzkUser user);

    /**
     * Get a username by it's username in the username.
     *
     * @param username the username of the user.
     * @return the user if it exists.
     */
    Optional<MzkUser> findByUsername(String username);

    /**
     * Change the current user password.
     *
     * @param newPasswords the object containing the new passwords.
     */
    void changeCurrentUserPassword(ResetPasswordDto newPasswords, MzkUser user);

    /**
     * Change the password of the given user.
     *
     * @param resetUserPassword the object containing the password and the userId.
     */
    void changeUserPassword(ResetUserPasswordDto resetUserPassword) throws MzkRestException;
}
