package org.manazeak.manazeak.service.security.user.badge;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.daos.security.BadgeDAO;
import org.manazeak.manazeak.datacreation.security.user.badge.BadgeDataCreation;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.security.Badge;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

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
        Assertions.assertEquals(2, badges.size(), "Too many badges were found.");
        // Checking the content of the badge
        AtomicBoolean found = new AtomicBoolean(false);
        badges.forEach((badge) -> {
            if (BadgeDataCreation.BADGE_CONTENT.equals(badge.getLabel())) {
                found.set(true);
            }
        });
        Assertions.assertTrue(found.get(), "The UT badge wasn't found in the database.");
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
