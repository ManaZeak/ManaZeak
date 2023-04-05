package org.manazeak.manazeak.entity.validator.user;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.manazeak.manazeak.entity.dto.user.PasswordContainer;

import java.util.Objects;

/**
 * Check if the passwords provided by the user match.
 */
public class PasswordsMatchValidator implements ConstraintValidator<PasswordMatches, PasswordContainer> {

    @Override
    public boolean isValid(PasswordContainer user, ConstraintValidatorContext context) {
        return Objects.equals(user.getPassword1(), user.getPassword2());
    }
}
