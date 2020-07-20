package org.manazeak.manazeak.entity.validator;

import org.manazeak.manazeak.exception.MzkValidationException;

import javax.validation.ConstraintValidatorContext;

/**
 * Used to add errors to the return of a validator for allowing multiple error in the same validation.
 */
public class ValidatorErrorHelper {

    private ValidatorErrorHelper() {

    }

    /**
     * Add the content of an validation exception into the context of the validator.
     *
     * @param e       the exception that will be processed.
     * @param context the context of the validator.
     */
    public static void addErrorMessage(MzkValidationException e, ConstraintValidatorContext context) {
        context.buildConstraintViolationWithTemplate(e.getMessage()).addConstraintViolation();
    }
}
