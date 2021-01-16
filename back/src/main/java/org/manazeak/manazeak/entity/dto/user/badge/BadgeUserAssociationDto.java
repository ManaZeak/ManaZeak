package org.manazeak.manazeak.entity.dto.user.badge;

import javax.validation.constraints.NotNull;

/**
 * Allows to associate a user and a badge
 */
public class BadgeUserAssociationDto {
    @NotNull(message = "{admin.badge.error.empty_badge_id}")
    private Long userId;

    @NotNull(message = "{admin.badge.error.empty_user_id}")
    private Long badgeId;

    public BadgeUserAssociationDto() {

    }

    public BadgeUserAssociationDto(final Long userId, final Long badgeId) {
        this.userId = userId;
        this.badgeId = badgeId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBadgeId() {
        return badgeId;
    }

    public void setBadgeId(Long badgeId) {
        this.badgeId = badgeId;
    }

}
