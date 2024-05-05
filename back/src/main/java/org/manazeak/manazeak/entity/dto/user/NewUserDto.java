package org.manazeak.manazeak.entity.dto.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.manazeak.manazeak.entity.validator.user.InviteCode;
import org.manazeak.manazeak.entity.validator.user.Password;
import org.manazeak.manazeak.entity.validator.user.PasswordMatches;
import org.manazeak.manazeak.entity.validator.user.UniqueUsername;


/**
 * This class represents a new user trying to create an account.
 */
@PasswordMatches
@Data
public class NewUserDto implements PasswordContainer {

    @NotEmpty(message = "{user.register.error.empty_username.message}")
    @Size(max = 200)
    @UniqueUsername
    private String username;
    @NotEmpty(message = "{user.register.error.empty_password.message}")
    @Password
    @Size(max = 512)
    private String password1;
    @NotEmpty(message = "{user.register.error.empty_confirm_password.message}")
    private String password2;
    @NotEmpty(message = "{user.register.error.empty_invite_code.message}")
    @InviteCode
    private String inviteCode;

    @Override
    public String getPassword1() {
        return password1;
    }

    @Override
    public String getPassword2() {
        return password2;
    }

}
