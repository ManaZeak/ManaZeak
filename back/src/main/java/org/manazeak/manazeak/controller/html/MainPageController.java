package org.manazeak.manazeak.controller.html;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller is used to handle the rendering of the main page.
 */
@Controller
public class MainPageController {

    /**
     * Loading the template for the main page.
     * @return the main page to the user.
     */
    @GetMapping("/")
    @Security(PrivilegeEnum.PLAY)
    public String getMainPage() {
        return "index.html";
    }
}
