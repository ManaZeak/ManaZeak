package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;

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
    void changeCurrentUserPassword(ResetPasswordDto newPasswords);
}
