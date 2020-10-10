package org.manazeak.manazeak.entity.dto.user.wish;

/**
 * Represent a user wish for the admin page or the user profile.
 */
public class UserWishListLineDto {

    private Long wishId;
    private String username;
    private String content;
    private String status;

    public Long getWishId() {
        return wishId;
    }

    public void setWishId(Long wishId) {
        this.wishId = wishId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
