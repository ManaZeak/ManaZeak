package org.manazeak.manazeak.controller.html.fragment.admin;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.manazeak.manazeak.service.security.admin.AdminUserService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * This fragment displays the list of user of the application.
 */
@FragmentController
public class UserListFragment {

    private final AdminUserService adminUserService;

    public UserListFragment(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    /**
     * Get the fragment containing the list of users available in the app.
     *
     * @return The fragment.
     */
    @Security(PrivilegeEnum.ADMV)
    @GetMapping("/user-list")
    public String getUserListFragment(Model model) {
        // Adding the list of users to the model.
        model.addAttribute("users", adminUserService.getUserList());
        // Returning the page.
        return AdminFragmentEnum.USER_LIST.getPage();
    }
}
