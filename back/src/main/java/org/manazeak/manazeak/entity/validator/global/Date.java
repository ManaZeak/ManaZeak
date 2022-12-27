package org.manazeak.manazeak.entity.validator.global;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateValidator.class)
public @interface Date {

    String message() default "{error.general.invalid_date}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
