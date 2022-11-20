package org.manazeak.manazeak.entity.dto.user.wish;

import lombok.Data;

/**
 * Represent a user wish for the admin page or the user profile.
 */
@Data
public class UserWishListLineDto {

    private Long wishId;
    private String username;
    private String content;
    private String status;
}
