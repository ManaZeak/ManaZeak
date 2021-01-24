package org.manazeak.manazeak.controller.html.fragment.modal.resetPassword;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.modal.ModalFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the about us modal to the user.
 */
@FragmentController
public class ResetPasswordModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/reset-password")
    public String getPage() {
        return ModalFragmentEnum.RESET_PASSWORD_MODAL.getPage();
    }
}
