package org.manazeak.manazeak.service.security.user.badge;

import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.dto.user.badge.NewBadgeDto;

import java.util.List;

/**
 * Manipulates the badges in the application.
 */
public interface BadgeService {

    /**
     * Create a new badge.
     */
    void createBadge(NewBadgeDto badge);

    /**
     * Get the list of the badge in the application.
     *
     * @return the list of the badges available.
     */
    List<BadgeListLineDto> getBadgesList();

    /**
     * Associate a user with a badge.
     *
     * @param userId  The user id that will be associated with the badge.
     * @param badgeId The badge id that will be associated to the user.
     */
    void associateBadgeToUser(Long userId, Long badgeId);
}
