package org.manazeak.manazeak.controller.fragment.ui.about;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the about us modal to the user.
 */
@FragmentController
public class AboutModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/about")
    public String getPage() {
        return UiFragmentEnum.ABOUT_MODAL.getPage();
    }
}
