package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.entity.dto.user.UserLoginDto;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * This class allows the render of the login screen of the application.
 */
@Controller
public class LoginController {

    /**
     * Add the user to the login page and display it.
     *
     * @param model the model of the page.
     * @return the String containing the login page.
     */
    private static String displayLoginPage(Model model) {
        // If the user is already connected we redirect him to the main page.
        if (!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken)) {
            return UserPageEnum.MAIN_PAGE.getRedirectToPage();
        }
        UserLoginDto user = new UserLoginDto();
        model.addAttribute("user", user);
        return UserPageEnum.LOGIN_PAGE.getPage();
    }

    /**
     * Get the login page of the application.
     *
     * @param model the model for thymeleaf.
     * @return The login page.
     */
    @GetMapping("/login")
    public String getLoginPage(Model model) {
        return displayLoginPage(model);
    }

    /**
     * Post the login page of the app.
     *
     * @param model the model for thymeleaf.
     * @return the login page.
     */
    @PostMapping("/login")
    public String postLoginPage(Model model) {
        return displayLoginPage(model);
    }
}