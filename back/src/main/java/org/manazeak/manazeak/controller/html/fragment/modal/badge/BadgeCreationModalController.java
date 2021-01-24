package org.manazeak.manazeak.controller.html.fragment.modal.badge;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.modal.ModalFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the about us modal to the user.
 */
@FragmentController
public class BadgeCreationModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/new-badge")
    public String getPage() {
        return ModalFragmentEnum.NEW_BADGE_MODAL.getPage();
    }
}
