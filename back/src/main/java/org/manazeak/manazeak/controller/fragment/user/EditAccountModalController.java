package org.manazeak.manazeak.controller.fragment.user;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.user.UserFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the about us modal to the user.
 */
@FragmentController
public class EditAccountModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/edit-account")
    public String getPage() {
        return UserFragmentEnum.EDIT_ACCOUNT_MODAL.getPage();
    }
}

