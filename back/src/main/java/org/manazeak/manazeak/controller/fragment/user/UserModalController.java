package org.manazeak.manazeak.controller.fragment.user;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.user.UserFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Contains the different modals displayed to the user on the user information.
 */
@FragmentController
public class UserModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/reset-password/")
    public String getResetPasswordModal() {
        return UserFragmentEnum.RESET_PASSWORD_MODAL.getPage();
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/edit-account/")
    public String getEditAccountModal() {
        return UserFragmentEnum.EDIT_ACCOUNT_MODAL.getPage();
    }
}
