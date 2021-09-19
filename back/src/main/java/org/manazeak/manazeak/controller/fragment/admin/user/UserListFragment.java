package org.manazeak.manazeak.controller.fragment.admin.user;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.manazeak.manazeak.service.security.user.UserService;
import org.manazeak.manazeak.service.security.user.badge.BadgeService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * This fragment displays the list of user of the application.
 */
@FragmentController
public class UserListFragment {

    private final UserService userService;
    private final BadgeService badgeService;

    public UserListFragment(UserService userService, BadgeService badgeService) {
        this.userService = userService;
        this.badgeService = badgeService;
    }

    /**
     * Get the fragment containing the list of users available in the app.
     * It also includes available badges.
     *
     * @param model The information need to build the HTML page.
     * @return The fragment.
     */
    @RestSecurity(PrivilegeEnum.ADMV)
    @GetMapping("/admin/user-list")
    public String getUserListFragment(Model model) {
        // Adding the list of users to the model.
        model.addAttribute("users", userService.getUserList());
        // Adding the list of badges to the model.
        model.addAttribute("badges", badgeService.getBadgesList());
        // Returning the page.
        return AdminFragmentEnum.USER_LIST.getPage();
    }
}
