package org.manazeak.manazeak.service.security.user.badge;

import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.security.user.badge.BadgeDataCreation;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Test for the manipulation of badges.
 */
class BadgeServiceTest extends AbstractManaZeakTest {

    @Autowired
    private BadgeDataCreation badgeDataCreation;

    @Autowired
    private BadgeService badgeService;

    @Autowired
    private BadgeVerifHelper badgeVerifHelper;

    /**
     * Test the generation of the badges of the application.
     */
    @Test
    void testGetBadges() {
        // Creating the badge.
        badgeDataCreation.createBadge();
        // Getting the badge list
        List<BadgeListLineDto> badges = badgeService.getBadgesList();
        // Checking the badge list.
        BadgeVerifHelper.checkListBadge(badges);
    }

    /**
     * Test that the badge deletion works.
     */
    @Test
    void testDeleteBadge() {
        badgeService.deleteBadge(1L);
        badgeVerifHelper.checkBadgeDeleted(1L);
    }
}
