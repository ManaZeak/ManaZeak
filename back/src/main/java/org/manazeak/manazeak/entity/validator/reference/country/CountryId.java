package org.manazeak.manazeak.entity.validator.reference.country;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Validate that a country exists.
 */
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CountryIdValidator.class)
public @interface CountryId {

    /**
     * The default message for this error.
     *
     * @return The message key for this error.
     */
    String message() default "{user.tellusmore.error.wrong_country}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
