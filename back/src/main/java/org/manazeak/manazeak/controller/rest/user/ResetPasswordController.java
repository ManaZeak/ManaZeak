package org.manazeak.manazeak.controller.rest.user;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.rest.AbstractRestController;
import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.service.error.ErrorHandlerService;
import org.manazeak.manazeak.service.user.UserManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Locale;

/**
 * This function allows the user to change his password.
 */
@RestController
public class ResetPasswordController extends AbstractRestController {

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
     * @param user The user making the request.
     * @param result the result of the validation.
     * @param locale           The locale used by the user.
     * @return the status of the request.
     */
    @PostMapping("/resetPassword")
    public KommunicatorObject changeCurrentUserPassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto,
                                                        @AuthenticationPrincipal MzkUser user,
                                                        BindingResult result, Locale locale) throws MzkRestException {
        // If there is validation error.
        if (result.hasErrors()) {
            errorHandler.generateRestErrorFromException(result.getFieldErrors(), locale);
        }
        // No validation errors, we proceed to change the user password.
        userManager.changeCurrentUserPassword(resetPasswordDto, user);
        // Success.
        return new KommunicatorObject(true);
    }

    /**
     * Change the password of a user.
     * @return the status of the request.
     */
    @PostMapping("/resetUserPassword")
    @RestSecurity(PrivilegeEnum.ADMV)
    public KommunicatorObject changeUserPassword(ResetUserPasswordDto resetPasswordDto) throws MzkRestException {
        userManager.changeUserPassword(resetPasswordDto);
        // Success.
        return new KommunicatorObject(true);
    }
}
