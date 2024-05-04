package org.manazeak.manazeak.controller.rest.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.dto.user.UserLoginDto;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class handles the login of a user.
 */
@RestController
@RequiredArgsConstructor
public class LoginControllerRest {

    private final UserService userService;

    @GetMapping("/test/")
    public String test() {
        return "test";
    }

    /**
     * Create a JWT token for the user.
     *
     * @return The token if the user exists in the database.
     */
    @PostMapping("/login/")
    public String getToken(@RequestBody @Valid UserLoginDto loginInfo) {
        return userService.createJwtToken(loginInfo.getUsername(), loginInfo.getPassword());
    }

}
