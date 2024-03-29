package org.manazeak.manazeak.controller.fragment.admin.user;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This class is used to render the information about the users of the application.
 */
@FragmentController
public class UserHierarchyFragment {

    private final UserService userService;

    public UserHierarchyFragment(UserService userService) {
        this.userService = userService;
    }

    /**
     * Display the page containing the users.
     *
     * @param model The information needed to build the page.
     * @return Get the hierarchy of the user in the application.
     */
    @RestSecurity(PrivilegeEnum.ADMV)
    @GetMapping("/user-hierarchy/")
    public String getUserHierarchy(Model model) {
        model.addAttribute("users", userService.getUserHierarchy());
        return AdminFragmentEnum.USER_HIERARCHY.getPage();
    }
}
