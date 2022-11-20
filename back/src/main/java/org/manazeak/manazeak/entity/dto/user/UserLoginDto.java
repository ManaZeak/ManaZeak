package org.manazeak.manazeak.entity.dto.user;

import lombok.Data;

/**
 * This class contains the information about a user that will try to log in.
 */
@Data
public class UserLoginDto {

    private String username;
    private String password;
}
