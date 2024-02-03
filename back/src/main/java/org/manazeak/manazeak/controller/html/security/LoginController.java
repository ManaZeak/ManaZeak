package org.manazeak.manazeak.controller.html.security;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.management.ConfigurationEnum;
import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.entity.dto.user.UserLoginDto;
import org.manazeak.manazeak.entity.management.Configuration;
import org.manazeak.manazeak.service.management.ConfigurationService;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;
import java.util.Set;

/**
 * This class allows the render of the login screen of the application.
 */
@Controller
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    private final ConfigurationService configurationService;

    /**
     * Get the login page of the application.
     *
     * @param model the model for thymeleaf.
     * @return The login page.
     */
    @GetMapping("/login/")
    public String getLoginPage(Model model) {
        return displayLoginPage(model);
    }

    /**
     * Post the login page of the app.
     *
     * @param model the model for thymeleaf.
     * @return the login page.
     */
    @PostMapping("/login/")
    public String postLoginPage(Model model) {
        return displayLoginPage(model);
    }

    /**
     * Add the user to the login page and display it.
     *
     * @param model the model of the page.
     * @return the String containing the login page.
     */
    private String displayLoginPage(Model model) {
        // If the user is already connected, we redirect him to the main page.
        if (userService.isUserConnected()) {
            return UserPageEnum.MAIN_PAGE.getRedirectToPage();
        }
        UserLoginDto user = new UserLoginDto();
        // Get the configuration used to autofill the login form.
        Map<ConfigurationEnum, Configuration> configs = configurationService.getConfigs(
                Set.of(
                        ConfigurationEnum.DEFAULT_LOGIN_ENABLED,
                        ConfigurationEnum.DEFAULT_LOGIN,
                        ConfigurationEnum.DEFAULT_PASSWORD
                )
        );

        // Adding the configuration to the page model.
        if (configurationService.resolveConfiguration(configs.get(ConfigurationEnum.DEFAULT_LOGIN_ENABLED), Boolean.class)) {
            user.setUsername(configs.get(ConfigurationEnum.DEFAULT_LOGIN).getValue());
            user.setPassword(configs.get(ConfigurationEnum.DEFAULT_PASSWORD).getValue());
        }
        model.addAttribute("user", user);
        return UserPageEnum.LOGIN_PAGE.getPage();
    }
}