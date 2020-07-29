package org.manazeak.manazeak.entity.validator.country;


import javax.validation.Constraint;
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
    String message() default "{error.register.wrong_country}";
}
