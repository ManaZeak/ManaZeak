package org.manazeak.manazeak.entity.dto.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.validator.user.Password;
import org.manazeak.manazeak.entity.validator.user.PasswordMatches;

/**
 * Used to change the password of the user.
 */
@PasswordMatches
@Data
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class ResetPasswordDto implements PasswordContainer {

    @Password
    private final String newPassword1;
    private final String newPassword2;

    @Override
    public String getPassword1() {
        return getNewPassword1();
    }

    @Override
    public String getPassword2() {
        return getNewPassword2();
    }
}
