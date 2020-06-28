package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.entity.dto.user.UserLoginDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * This class allows the render of the login screen of the application.
 */
@Controller
public class LoginController {

    /**
     * Get the login page of the application.
     *
     * @return The login page.
     */
    @RequestMapping(value = "/login", method = {RequestMethod.GET, RequestMethod.POST})
    public String getLoginPage(Model model) {
        UserLoginDto user = new UserLoginDto();
        model.addAttribute("user", user);
        return "user/login.html";
    }
}