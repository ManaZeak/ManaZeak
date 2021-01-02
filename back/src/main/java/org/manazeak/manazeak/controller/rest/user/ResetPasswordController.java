package org.manazeak.manazeak.controller.rest.user;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.service.error.ErrorHandlerService;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * This function allows the user to change his password.
 */
@RestController
public class ResetPasswordController {

    /**
     * Allows to handle the front errors.
     */
    private final ErrorHandlerService errorHandler;

    private final UserManager userManager;

    public ResetPasswordController(ErrorHandlerService errorHandler, UserManager userManager) {
        this.errorHandler = errorHandler;
        this.userManager = userManager;
    }

    @GetMapping("/test")
    @RestSecurity(PrivilegeEnum.ADMV)
    public NewUserDto test() {
        return new NewUserDto();
    }

    /**
     * Reset the password of the current user.
     *
     * @param resetPasswordDto Containing the new password of the user.
     * @param user             The user making the request.
     * @param result           the result of the validation.
     * @return the status of the request.
     */
    @PostMapping("/resetPassword")
    public KommunicatorDto changeCurrentUserPassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto,
                                                     @AuthenticationPrincipal MzkUser user,
                                                     BindingResult result) throws MzkRestException {
        // If there is validation error.
        if (result.hasErrors()) {
            errorHandler.generateRestErrorFromValidationError(result.getFieldErrors());
        }
        // No validation errors, we proceed to change the user password.
        userManager.changeCurrentUserPassword(resetPasswordDto, user);
        // Success.
        return new KommunicatorDto(true);
    }

    /**
     * Change the password of a user.
     *
     * @return the status of the request.
     */
    @PostMapping("/resetUserPassword")
    @RestSecurity(PrivilegeEnum.ADMV)
    public KommunicatorDto changeUserPassword(ResetUserPasswordDto resetPasswordDto) throws MzkRestException {
        userManager.changeUserPassword(resetPasswordDto);
        // Success.
        return new KommunicatorDto(true);
    }
}
