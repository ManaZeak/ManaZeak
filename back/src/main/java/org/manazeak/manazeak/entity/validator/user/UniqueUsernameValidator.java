package org.manazeak.manazeak.entity.validator.user;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.user.UserService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

/**
 * This class allows to check if the username of the user is unique.
 */
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    private final UserService userService;

    /**
     * Construct an instance.
     * We shouldn't worry about the @Service / @Component, spring do it for us.
     *
     * @param userService the user service.
     */
    public UniqueUsernameValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(String userName, ConstraintValidatorContext constraintValidatorContext) {
        // Checking if the a username exists.
        Optional<MzkUser> user = userService.findByUsername(userName);
        // If there is no user it's ok.
        return user.isEmpty();
    }
}
