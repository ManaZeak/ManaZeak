package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.entity.dto.user.UserLoginDto;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This class allows the render of the login screen of the application.
 */
@Controller
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get the login page of the application.
     *
     * @param model the model for thymeleaf.
     * @return The login page.
     */
    @GetMapping("/login/")
    public String getLoginPage(Model model) {
        // If the user is already connected we redirect him to the main page.
        if (userService.isUserConnected()) {
            return UserPageEnum.MAIN_PAGE.getRedirectToPage();
        }
        UserLoginDto user = new UserLoginDto();
        model.addAttribute("user", user);
        return UserPageEnum.LOGIN_PAGE.getPage();
    }
}