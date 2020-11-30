package org.manazeak.manazeak.controller.html.fragment.admin.wish;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This fragment is used to display wishes for the admin.
 */
@FragmentController
public class WishAdminFragment {

    private final WishService wishService;

    public WishAdminFragment(final WishService wishService) {
        this.wishService = wishService;
    }

    /**
     * Get all the wishes of the application
     *
     * @param model The spring model.
     */
    @Security(PrivilegeEnum.WISR)
    @GetMapping("/admin/wish/all")
    public String getAllWishes(Model model) {
        model.addAttribute("wishes", wishService.getAllWishes());
        return AdminFragmentEnum.WISH_LIST.getPage();
    }
}
