package org.manazeak.manazeak.controller.rest.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.manager.error.ErrorHandlerManager;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
public class RegisterControllerRest {

    /**
     * Allows handling the reporting of errors to the front.
     */
    private final ErrorHandlerManager errorHandler;
    private final UserService userService;

    /**
     * Adding a new user into the app.
     *
     * @param newUser This field is tested. If there is an error, the user cannot be created.
     * @param result  The error for thymeleaf to display errors.
     * @return The JWT if the user is created correctly, an error otherwise.
     */
    @PostMapping("/register/")
    public String registerUser(@RequestBody @Valid NewUserDto newUser, BindingResult result) {
        // Handing the validation errors of the user.
        errorHandler.handleValidationErrors(result);

        // If the user is connected, sending an error.
        if (userService.isUserConnected()) {
            throw new MzkRestException("general.error", "user.register.error.already_connected", NotificationSeverityEnum.ERROR);
        }

        // Creating the user.
        userService.createUser(newUser);

        // Creating the JWT for the new user.
        return userService.createJwtToken(newUser.getUsername(), newUser.getPassword1());
    }
}
