package org.manazeak.manazeak.entity.validator.global;

import org.manazeak.manazeak.util.DateUtil;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.format.DateTimeParseException;

/**
 * Checks if a form date is valid.
 */
public class DateValidator implements ConstraintValidator<Date, String> {

    /**
     * Check if a date is valid.
     *
     * @param date                       The date to check.
     * @param constraintValidatorContext The context to put messages inside.
     * @return True if the date is valid.
     */
    @Override
    public boolean isValid(String date, ConstraintValidatorContext constraintValidatorContext) {
        try {
            DateUtil.parseString(date, DateUtil.US_DATE_FORMATTER);
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }
}
