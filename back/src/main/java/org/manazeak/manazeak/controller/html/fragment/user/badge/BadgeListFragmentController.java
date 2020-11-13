package org.manazeak.manazeak.controller.html.fragment.user.badge;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.user.badge.BadgeFragmentEnum;
import org.manazeak.manazeak.service.security.user.badge.BadgeService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Display the list of badges available in the application.
 */
@FragmentController
public class BadgeListFragmentController {

    public BadgeService badgeService;

    public BadgeListFragmentController(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    /**
     * Get the list of the badges of the application.
     * @return the list of the badges.
     */
    @RestSecurity(PrivilegeEnum.ADMV)
    @GetMapping("/badge-list")
    public String getBadgeList(Model model) {
        model.addAttribute("badges", badgeService.getBadgesList());
        return BadgeFragmentEnum.BADGE_LIST.getPage();
    }


}
