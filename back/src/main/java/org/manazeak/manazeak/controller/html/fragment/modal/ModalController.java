package org.manazeak.manazeak.controller.html.fragment.modal;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.modal.ModalFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;
/* FIXME */
/**
 * Allows to display the main page to the users.
 */
@FragmentController
public class ModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/about")
    public String getPage() {
        return ModalFragmentEnum.ABOUT_MODAL.getPage();
    }
}
