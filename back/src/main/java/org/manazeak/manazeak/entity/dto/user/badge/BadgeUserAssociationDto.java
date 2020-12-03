package org.manazeak.manazeak.entity.dto.user.badge;

import com.fasterxml.jackson.annotation.JsonCreator;

import javax.validation.constraints.NotEmpty;

/**
 * Allows to associate a user and a badge
 */
public class BadgeUserAssociationDto {

    @NotEmpty(message = "{user.badge.empty_id}")
    private final Long userId;
    @NotEmpty(message = "{user.empty_id}")
    private final Long badgeId;

    @JsonCreator
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
}
