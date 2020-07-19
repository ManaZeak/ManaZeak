package org.manazeak.manazeak.entity.validator.user;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Do the checks on a avatar.
 */
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AvatarValidator.class)
public @interface Avatar {
    String message() default "{error.register.bad_avatar}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
