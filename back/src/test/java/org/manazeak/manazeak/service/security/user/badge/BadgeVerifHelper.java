package org.manazeak.manazeak.service.security.user.badge;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.datacreation.security.user.badge.BadgeDataCreation;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;

import java.util.List;

/**
 * Check badges objects for unit tests.
 */
public final class BadgeVerifHelper {

    private BadgeVerifHelper() {

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
}
