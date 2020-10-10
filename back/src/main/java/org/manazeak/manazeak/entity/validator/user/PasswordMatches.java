package org.manazeak.manazeak.entity.validator.user;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordsMatchValidator.class)
public @interface PasswordMatches {

    String message() default "{user.register.error.pass_mismatch}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
