package org.manazeak.manazeak.service.security.user.badge;

import org.manazeak.manazeak.daos.security.BadgeDAO;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.dto.user.badge.NewBadgeDto;
import org.manazeak.manazeak.entity.security.Badge;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Manage the badges of the application.
 */
@Service
public class BadgeManager {

    /**
     * The badge DAO.
     */
    private final BadgeDAO badgeDAO;

    public BadgeManager(BadgeDAO badgeDAO) {
        this.badgeDAO = badgeDAO;
    }

    /**
     * Creates a badge.
     *
     * @param newBadge the information about the badge.
     */
    public void createBadge(NewBadgeDto newBadge) {
        Badge badge = new Badge();
        badge.setLabel(newBadge.getLabel());
        badgeDAO.save(badge);
    }

    /**
     * Get the list of badges of the application.
     *
     * @return The list of badges.
     */
    public List<BadgeListLineDto> getBadges() {
        // Getting the list of the badges.
        List<Badge> badges = badgeDAO.getAllBadges();
        return BadgeHelper.convertBadges(badges);
    }

}
