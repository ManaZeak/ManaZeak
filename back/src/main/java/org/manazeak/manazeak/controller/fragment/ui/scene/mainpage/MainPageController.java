package org.manazeak.manazeak.controller.fragment.ui.scene.mainpage;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Allows to display the main page to the users.
 */
@FragmentController
public class MainPageController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/mainpage")
    public String getMainPage() {
        return UiFragmentEnum.MAIN_PAGE.getPage();
    }
}
