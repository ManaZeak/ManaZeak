package org.manazeak.manazeak.entity.dto.user.badge;

import lombok.Data;

/**
 * Contains the information about a user in the badge display.
 */
@Data
public class UserBadgeDto {

    /**
     * The user id.
     */
    private Long userId;
    /**
     * The username.
     */
    private String username;

}
