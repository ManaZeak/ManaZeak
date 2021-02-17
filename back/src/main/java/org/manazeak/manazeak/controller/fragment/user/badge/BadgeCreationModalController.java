package org.manazeak.manazeak.controller.fragment.user.badge;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.user.badge.BadgeFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the about us modal to the user.
 */
@FragmentController
public class BadgeCreationModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/new-badge")
    public String getPage() {
        return BadgeFragmentEnum.NEW_BADGE_MODAL.getPage();
    }
}
