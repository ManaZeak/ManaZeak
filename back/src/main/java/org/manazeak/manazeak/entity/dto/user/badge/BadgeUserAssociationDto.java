package org.manazeak.manazeak.entity.dto.user.badge;

import com.fasterxml.jackson.annotation.JsonCreator;

import javax.validation.constraints.NotEmpty;

/**
 * Allows to associate a user and a badge
 */
public class BadgeUserAssociationDto {
    // FIXME not null instead of not empty
    //@NotEmpty(message = "{user.badge.empty_id}")
    private Long userId;

    //@NotEmpty(message = "{user.empty_id}")
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

    public Long getBadgeId() {
        return badgeId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setBadgeId(Long badgeId) {
        this.badgeId = badgeId;
    }

}
