package org.manazeak.manazeak.entity.validator.user;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.PasswordContainer;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Check if the passwords provided by the user match.
 */
public class PasswordsMatchValidator implements ConstraintValidator<PasswordMatches, PasswordContainer> {

    @Override
    public boolean isValid(PasswordContainer user, ConstraintValidatorContext context) {
        return user.getPassword1().equals(user.getPassword2());
    }
}
