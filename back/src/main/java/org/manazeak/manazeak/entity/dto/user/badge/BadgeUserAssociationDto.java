package org.manazeak.manazeak.entity.dto.user.badge;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Allows to associate a user and a badge
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadgeUserAssociationDto {
    @NotNull(message = "{admin.badge.error.empty_badge_id}")
    private Long userId;

    @NotNull(message = "{admin.badge.error.empty_user_id}")
    private Long badgeId;

}
