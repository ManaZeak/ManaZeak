package org.manazeak.manazeak.controller.html.fragment.modal.about;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.modal.ModalFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the about us modal to the user.
 */
@FragmentController
public class AboutModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/about")
    public String getPage() {
        return ModalFragmentEnum.ABOUT_MODAL.getPage();
    }
}
