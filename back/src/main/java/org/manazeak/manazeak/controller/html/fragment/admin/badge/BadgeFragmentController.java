package org.manazeak.manazeak.controller.html.fragment.admin.badge;

import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.service.security.user.badge.BadgeService;

/**
 * Contains the fragment for the user to control the badges.
 */
@FragmentController
public class BadgeFragmentController {

    private final BadgeService badgeService;

    public BadgeFragmentController(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    /**
     * Create a new badge.
     * @return The fragment for creating the badge.
     */
    public String createBadge() {
        // TODO: to be implemented
        return null;
    }
}
