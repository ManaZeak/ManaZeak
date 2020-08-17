package org.manazeak.manazeak.entity.dto.user;

import org.manazeak.manazeak.entity.validator.user.InviteCode;
import org.manazeak.manazeak.entity.validator.user.PasswordMatches;
import org.manazeak.manazeak.entity.validator.user.UniqueUsername;

import javax.validation.constraints.NotEmpty;

/**
 * This class represents a new user trying to create an account.
 */
@PasswordMatches
public class NewUserDto implements PasswordContainer {

    @NotEmpty(message = "{user.register.error.empty_username}")
    @UniqueUsername
    private String username;
    @NotEmpty(message = "{user.register.error.empty_password}")
    private String password1;
    @NotEmpty(message = "{user.register.error.empty_confirm_password}")
    private String password2;
    @NotEmpty(message = "{user.register.error.empty_invite_code}")
    @InviteCode
    private String inviteCode;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword1() {
        return password1;
    }

    public void setPassword1(String password1) {
        this.password1 = password1;
    }

    @Override
    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }
}
