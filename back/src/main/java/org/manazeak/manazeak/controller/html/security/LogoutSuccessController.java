package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller handles the render of the logout success page.
 */
@Controller
public class LogoutSuccessController {

    /**
     * Display the page to the user.
     *
     * @return The logged out page.
     */
    @GetMapping("/logoutSuccess/")
    public String getLogoutSuccess() {
        return UserPageEnum.LOGOUT_SUCCESS.getPage();
    }
}
