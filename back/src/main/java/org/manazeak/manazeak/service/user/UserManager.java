package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRestException;

/**
 * Manages the creation of user in the database.
 */
public interface UserManager {

    /**
     * Insert a user from the front into the database.
     *
     * @return the user inserted.
     */
    MzkUser insertUser(NewUserDto newUser);

    /**
     * Change the current user password.
     * @param newPasswords the object containing the new passwords.
     */
    void changeCurrentUserPassword(ResetPasswordDto newPasswords, MzkUser user);

    /**
     * Change the password of the given user.
     * @param resetUserPassword the object containing the password and the userId.
     */
    void changeUserPassword(ResetUserPasswordDto resetUserPassword) throws MzkRestException;
}
