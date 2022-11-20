package org.manazeak.manazeak.entity.dto.user.wish;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * Represent a wish for a user.
 */
@Data
public class UserWishDto {

    @NotEmpty(message = "{user.wish.error.empty}")
    private String content;
}
