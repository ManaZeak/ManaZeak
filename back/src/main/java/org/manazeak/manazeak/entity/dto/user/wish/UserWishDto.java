package org.manazeak.manazeak.entity.dto.user.wish;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;


/**
 * Represent a wish for a user.
 */
@Data
public class UserWishDto {

    @NotEmpty(message = "{user.wish.error.empty}")
    private String content;
}
