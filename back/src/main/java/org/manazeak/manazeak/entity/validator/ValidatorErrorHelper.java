package org.manazeak.manazeak.entity.validator;

import jakarta.validation.ConstraintValidatorContext;
import org.manazeak.manazeak.exception.MzkValidationException;

/**
 * Used to add errors to the return of a validator for allowing multiple error in the same validation.
 */
public final class ValidatorErrorHelper {

    private ValidatorErrorHelper() {

    }

    /**
     * Add the content of an validation exception into the context of the validator.
     *
     * @param e       the exception that will be processed.
     * @param context the context of the validator.
     */
    public static void addErrorMessage(MzkValidationException e, ConstraintValidatorContext context) {
        addErrorMessage(e.getMessage(), context);
    }

    /**
     * Add validation error with a custom message.
     *
     * @param message The custom message to add.
     * @param context the context of the validator.
     */
    public static void addErrorMessage(String message, ConstraintValidatorContext context) {
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }
}
