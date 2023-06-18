package org.manazeak.manazeak.entity.dto.user;

import org.manazeak.manazeak.entity.validator.user.Password;
import org.manazeak.manazeak.entity.validator.user.PasswordMatches;

/**
 * Used to change the password of the user.
 */
@PasswordMatches
public record ResetPasswordDto(@Password String newPassword1, String newPassword2) implements PasswordContainer {

    @Override
    public String getPassword1() {
        return newPassword1;
    }

    @Override
    public String getPassword2() {
        return newPassword2;
    }
}
