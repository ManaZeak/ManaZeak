package org.manazeak.manazeak.service.security.user.badge;

import org.manazeak.manazeak.daos.security.BadgeDAO;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.dto.user.badge.NewBadgeDto;
import org.manazeak.manazeak.entity.security.Badge;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkObjectNotFoundException;
import org.manazeak.manazeak.service.security.user.UserManager;
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

    private final UserManager userManager;

    public BadgeManager(BadgeDAO badgeDAO, UserManager userManager) {
        this.badgeDAO = badgeDAO;
        this.userManager = userManager;
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

    /**
     * Get a badge with the badge id throw a {@link MzkObjectNotFoundException} if no object where found.
     *
     * @param badgeId The badge id.
     * @return The badge found in the database.
     */
    public Badge getBadge(Long badgeId) {
        return badgeDAO.findById(badgeId).orElseThrow(() ->
                new MzkObjectNotFoundException("No badge found in database for id :" + badgeId,
                        "user.badge.error.not_found", "user.badge.error.not_found_title")
        );
    }

    /**
     * Associate a user to a badge
     *
     * @param userId  The user id that will be linked to the badge.
     * @param badgeId The badge id that will be linked to the user.
     */
    public void associateUserToBadge(Long userId, Long badgeId) {
        // Getting the badge
        Badge badge = getBadge(badgeId);
        MzkUser user = userManager.getUserById(userId);
        // Adding the user to the badge.
        badge.getMzkUserList().add(user);
        badgeDAO.save(badge);
    }

}
