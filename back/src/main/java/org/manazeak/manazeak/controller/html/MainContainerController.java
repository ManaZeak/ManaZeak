package org.manazeak.manazeak.controller.html;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.manager.security.user.info.AdditionalInfoManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller is used to handle the rendering of the main page.
 */
@Controller
public class MainContainerController {

    AdditionalInfoManager additionalInfoManager;

    public MainContainerController(AdditionalInfoManager additionalInfoManager) {
        this.additionalInfoManager = additionalInfoManager;
    }

    /**
     * @return The page used to start the mzk application.
     */
    @GetMapping("/")
    public String geBoarding() {
        return "boarding";
    }

    /**
     * Loading the template for the main page.
     *
     * @return the main page to the user.
     */
    @GetMapping("/app/")
    @Security(PrivilegeEnum.PLAY)
    public String getMainPage() {
        return "index";
    }
}
