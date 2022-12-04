package org.manazeak.manazeak.entity.validator.reference.locale;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LocaleIdValidator.class)
public @interface LocaleId {

    /**
     * The default message for this error.
     *
     * @return The message key for this error.
     */
    String message() default "{user.tellusmore.error.wrong_locale}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
