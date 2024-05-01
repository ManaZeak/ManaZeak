package org.manazeak.manazeak.entity.dto.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

/**
 * This class contains the information about a user that will try to log in.
 */
@Data
public class UserLoginDto {

    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
}
