package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

/**
 * This controller allows users to create an account into the application.
 */
@Controller
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        NewUserDto userDto = new NewUserDto();
        model.addAttribute("user", userDto);
        return "user/register.html";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute("user") @Valid NewUserDto newUser, BindingResult result) {
        // trying to create a user into the database.
        if (result.hasErrors()) {
            return "user/register.html";
        }
        MzkUser user = userService.createUser(newUser);
        return "user/register.html";
    }
}
