package org.manazeak.manazeak.entity.validator.user;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
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

    String message() default "{user.tellusmore.error.bad_avatar}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
