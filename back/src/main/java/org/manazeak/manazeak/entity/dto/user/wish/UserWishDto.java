package org.manazeak.manazeak.entity.dto.user.wish;

import javax.validation.constraints.NotEmpty;

/**
 * Represent a wish for a user.
 */
public class UserWishDto {

    @NotEmpty(message = "user.wish.error.empty")
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
