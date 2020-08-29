package org.manazeak.manazeak.controller.html;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.service.security.user.AdditionalInfoManager;
import org.manazeak.manazeak.service.security.user.UserManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller is used to handle the rendering of the main page.
 */
@Controller
public class MainPageController {

    AdditionalInfoManager additionalInfoManager;

    public MainPageController(AdditionalInfoManager additionalInfoManager) {
        this.additionalInfoManager = additionalInfoManager;
    }

    /**
     * Loading the template for the main page.
     *
     * @return the main page to the user.
     */
    @GetMapping("/")
    @Security(PrivilegeEnum.PLAY)
    public String getMainPage() {
        if (!additionalInfoManager.isUserComplete()) {
            return UserPageEnum.ADDITIONAL_INFO.getRedirectToPage();
        }
        return "index.html";
    }
}
