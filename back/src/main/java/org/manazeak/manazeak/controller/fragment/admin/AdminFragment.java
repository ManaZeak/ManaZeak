package org.manazeak.manazeak.controller.fragment.admin;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This fragment is used to display the admin page to any user that is an admin.
 */
@FragmentController
public class AdminFragment {

    @RestSecurity(PrivilegeEnum.ADMV)
    @GetMapping("/admin")
    public String getMainPage() {
        return AdminFragmentEnum.ADMIN_PAGE.getPage();
    }
}
