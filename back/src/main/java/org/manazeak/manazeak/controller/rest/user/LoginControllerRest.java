package org.manazeak.manazeak.controller.rest.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.user.UserLoginDto;
import org.manazeak.manazeak.manager.error.ErrorHandlerManager;
import org.manazeak.manazeak.service.security.JWTService;
import org.springframework.validation.BindingResult;
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

    private final JWTService jwtService;

    private final ErrorHandlerManager errorHandlerManager;

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
    public String getToken(@RequestBody @Valid UserLoginDto loginInfo, BindingResult bindingResult) {
        errorHandlerManager.handleValidationErrors(bindingResult);
        return jwtService.createJwtToken(loginInfo.getUsername(), loginInfo.getPassword());
    }

    /**
     * @return Sends a new token to an already connected user.
     */
    @RestSecurity(PrivilegeEnum.PLAY)
    @GetMapping("/renew-token/")
    public String renewToken() {
        // Sending a new token for the connected user.
        return jwtService.renewToken();
    }

}
