package org.manazeak.manazeak.controller.rest.user;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.rest.AbstractRestController;
import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.service.error.ErrorHandlerService;
import org.springframework.context.MessageSource;
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

    private final ErrorHandlerService errorHandler;

    public ResetPasswordController(ErrorHandlerService errorHandler, MessageSource messageSource) {
        super(messageSource);
        this.errorHandler = errorHandler;
    }

    @GetMapping("/test")
    @RestSecurity(PrivilegeEnum.ADMV)
    public NewUserDto test() {
        return new NewUserDto();
    }

    /**
     * Reset the password of the user.
     *
     * @param resetPasswordDto Containing the new password of the user.
     * @param locale           The locale used by the user.
     * @return the status of the request.
     */
    @PostMapping("/resetPassword")
    public KommunicatorObject changeUserPassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto,
                                                 BindingResult result, Locale locale) {
        // If there is validation error.
        if (result.hasErrors()) {
            return errorHandler.createKommunicatorObjectFromError(result.getFieldErrors(), locale);
        }
        // No validation errors, we proceed to change the user password.

        return new KommunicatorObject(true);
    }
}
