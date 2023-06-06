package org.manazeak.manazeak.controller.rest.user;

import jakarta.validation.Valid;
import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.manager.error.ErrorHandlerManager;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


/**
 * This function allows the user to change his password.
 */
@RestController
public class ResetPasswordController {

    /**
     * Allows to handle the front errors.
     */
    private final ErrorHandlerManager errorHandler;

    private final UserService userService;

    public ResetPasswordController(ErrorHandlerManager errorHandler, UserService userService) {
        this.errorHandler = errorHandler;
        this.userService = userService;
    }

    /**
     * Reset the password of the current user.
     *
     * @param resetPasswordDto Containing the new password of the user.
     * @param user             The user making the request.
     * @param result           the result of the validation.
     * @return the status of the request.
     */
    @PostMapping("/resetPassword/")
    @RestSecurity(PrivilegeEnum.PLAY)
    public KommunicatorDto changeCurrentUserPassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto,
                                                     @AuthenticationPrincipal MzkUser user,
                                                     BindingResult result) throws MzkRestException {
        // If there is validation error.
        if (result.hasErrors()) {
            errorHandler.generateRestErrorFromValidationError(result.getFieldErrors());
        }
        // No validation errors, we proceed to change the user password.
        userService.changeUserPassword(resetPasswordDto, user);
        // Success.
        return new KommunicatorDto(true);
    }

    /**
     * Change the password of a user.
     *
     * @param resetPasswordDto The information containing the password.
     * @return the status of the request.
     */
    @PostMapping("/resetUserPassword/")
    @RestSecurity(PrivilegeEnum.ADMV)
    public KommunicatorDto changeUserPassword(@RequestBody ResetUserPasswordDto resetPasswordDto) throws MzkRestException {
        userService.changeUserPassword(resetPasswordDto);
        // Success.
        return new KommunicatorDto(true);
    }
}
