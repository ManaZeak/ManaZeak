package org.manazeak.manazeak.entity.dto.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * This class contains the information about a user that will try to log in.
 */
@Data
public class UserLoginDto {

    @Size(max = 200)
    @NotEmpty
    private String username;
    @Size(max = 512)
    @NotEmpty
    private String password;
}
