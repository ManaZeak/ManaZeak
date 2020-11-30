package org.manazeak.manazeak.controller.html.fragment.admin;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This fragment is used to display the admin page to any user that is an admin.
 */
@FragmentController
public class AdminFragment {

    @Security(PrivilegeEnum.ADMV)
    @GetMapping("/admin")
    public String getMainPage() {
        return AdminFragmentEnum.ADMIN_PAGE.getPage();
    }
}
