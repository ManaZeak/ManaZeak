package org.manazeak.manazeak.entity.validator.user;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.manazeak.manazeak.entity.validator.ValidatorErrorHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Allows to check if a password is strong.
 */
@Component
public class PasswordValidator implements ConstraintValidator<Password, String> {

    /**
     * The password size stored in application.properties
     */
    @Value("${app.passwordLength}")
    private int passwordLength;

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        // Check if the password is correct.
        if (password.length() < passwordLength) {
            setErrorMessagePasswordTooShort(constraintValidatorContext);
            return false;
        }
        return true;
    }

    /**
     * Add the message the password is too short to the validation.
     *
     * @param constraintValidatorContext The validation context.
     */
    private void setErrorMessagePasswordTooShort(ConstraintValidatorContext constraintValidatorContext) {
        String sb = "{user.register.error.pass_too_short.message} " + passwordLength +
                " {user.register.error.pass_too_short_end.message}";
        ValidatorErrorHelper.addErrorMessage(sb, constraintValidatorContext);
    }
}
