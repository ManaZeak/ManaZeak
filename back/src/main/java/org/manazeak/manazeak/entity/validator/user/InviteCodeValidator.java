package org.manazeak.manazeak.entity.validator.user;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.manazeak.manazeak.entity.validator.ValidatorErrorHelper;
import org.manazeak.manazeak.exception.MzkValidationException;
import org.manazeak.manazeak.service.security.invite.InviteCodeService;
import org.springframework.stereotype.Component;

@Component
public class InviteCodeValidator implements ConstraintValidator<InviteCode, String> {

    /**
     * The service for checking the invite code.
     */
    private final InviteCodeService inviteCodeService;

    public InviteCodeValidator(InviteCodeService inviteCodeService) {
        this.inviteCodeService = inviteCodeService;
    }

    /**
     * Check if the invite code is correct and is active in the database.
     *
     * @param inviteCode                 the String containing the invite code.
     * @param constraintValidatorContext context object.
     * @return True if the code is valid.
     */
    @Override
    public boolean isValid(String inviteCode, ConstraintValidatorContext constraintValidatorContext) {
        // Disabling the default error reporting.
        constraintValidatorContext.disableDefaultConstraintViolation();
        boolean isValid = true;
        try {
            inviteCodeService.checkInviteCode(inviteCode);
        } catch (MzkValidationException e) {
            // Setting our own error message.
            ValidatorErrorHelper.addErrorMessage(e, constraintValidatorContext);
            // The invite code is not valid.
            isValid = false;
        }
        return isValid;
    }
}
