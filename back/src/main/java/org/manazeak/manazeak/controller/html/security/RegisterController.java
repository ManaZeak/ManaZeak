package org.manazeak.manazeak.controller.html.security;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller allows users to create an account into the application.
 */
@Controller
@RequiredArgsConstructor
public class RegisterController {

    /**
     * Service for interracting with the users.
     */
    private final UserService userService;

    /**
     * Display the registration form.
     *
     * @param model the object to pass to thymeleaf to fill.
     * @return the register page.
     */
    @GetMapping("/register/")
    public String showRegistrationForm(Model model) {
        // If the user is connected, we redirect him to the main page.
        if (userService.isUserConnected()) {
            return UserPageEnum.MAIN_PAGE.getRedirectToPage();
        }
        NewUserDto userDto = new NewUserDto();
        model.addAttribute("user", userDto);
        return UserPageEnum.REGISTER_PAGE.getPage();
    }
}
