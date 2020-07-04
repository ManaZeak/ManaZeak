package org.manazeak.manazeak.entity.dto.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.manazeak.manazeak.entity.validator.user.PasswordMatches;

/**
 * Used to change the password of the user.
 */
@PasswordMatches
public class ResetPasswordDto implements PasswordContainer {

    private final String newPassword1;
    private final String newPassword2;

    @JsonCreator
    public ResetPasswordDto(String newPassword1, String newPassword2) {
        this.newPassword1 = newPassword1;
        this.newPassword2 = newPassword2;
    }

    public String getNewPassword1() {
        return newPassword1;
    }

    public String getNewPassword2() {
        return newPassword2;
    }

    @Override
    public String getPassword1() {
        return getNewPassword1();
    }

    @Override
    public String getPassword2() {
        return getNewPassword2();
    }
}
