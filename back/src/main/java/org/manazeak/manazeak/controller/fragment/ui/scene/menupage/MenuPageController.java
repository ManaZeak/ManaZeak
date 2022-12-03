package org.manazeak.manazeak.controller.fragment.ui.scene.menupage;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.configuration.security.SecurityUtil;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Allows to display the main page to the users.
 */
@FragmentController
public class MenuPageController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/menupage/")
    public String getMenuPage(Model model) {
        model.addAttribute("isAdmin", SecurityUtil.currentUserHasPrivilege(PrivilegeEnum.ADMV));
        return UiFragmentEnum.MENU_PAGE.getPage();
    }
}
