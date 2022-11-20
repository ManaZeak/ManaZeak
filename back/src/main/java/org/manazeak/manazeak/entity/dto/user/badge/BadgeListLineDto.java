package org.manazeak.manazeak.entity.dto.user.badge;

import lombok.Data;

import java.util.List;

/**
 * A line containing a badge.
 */
@Data
public class BadgeListLineDto {

    private String label;

    private Long badgeId;

    private List<UserBadgeDto> users;
}
