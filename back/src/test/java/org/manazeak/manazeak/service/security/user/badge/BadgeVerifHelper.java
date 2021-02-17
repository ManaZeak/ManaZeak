package org.manazeak.manazeak.service.security.user.badge;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.daos.security.BadgeDAO;
import org.manazeak.manazeak.datacreation.security.user.badge.BadgeDataCreation;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.security.Badge;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * Check badges objects for unit tests.
 */
@Component
public class BadgeVerifHelper {

    private final BadgeDAO badgeDAO;

    public BadgeVerifHelper(BadgeDAO badgeDAO) {
        this.badgeDAO = badgeDAO;
    }

    /**
     * Check that the badge created was returned in the list.
     */
    public static void checkListBadge(List<BadgeListLineDto> badges) {
        // Checking the size of the list.
        Assertions.assertEquals(1, badges.size(), "Too many badges were found.");
        // Checking the content of the badge
        BadgeListLineDto badge = badges.get(0);
        Assertions.assertEquals(BadgeDataCreation.BADGE_CONTENT, badge.getLabel(), "The badge label is wrong.");
        // Checking there is no user linked to the badge
        Assertions.assertEquals(0, badge.getUsers().size(), "No user should be linked to this badge.");
    }

    /**
     * Check that a badge has been deleted from the database.
     *
     * @param badgeId The badge id.
     */
    public void checkBadgeDeleted(Long badgeId) {
        Optional<Badge> badge = badgeDAO.findById(badgeId);
        if (badge.isPresent()) {
            Assertions.fail("The badge hasn't been deleted.");
        }
    }
}
