package org.manazeak.manazeak.entity.validator.user;

import org.manazeak.manazeak.service.security.invite.InviteCodeService;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

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
        return inviteCodeService.checkInviteCode(inviteCode);
    }
}
