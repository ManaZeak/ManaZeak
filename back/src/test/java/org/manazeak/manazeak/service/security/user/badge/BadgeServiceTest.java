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
}
