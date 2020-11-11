package org.manazeak.manazeak.entity.dto.user.badge;

/**
 * Contains the information about a user in the badge display.
 */
public class UserBadgeDto {

    /**
     * The user id.
     */
    private Long userId;
    /**
     * The username.
     */
    private String username;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
