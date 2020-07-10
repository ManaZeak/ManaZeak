package org.manazeak.manazeak.entity.validator.user;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = InviteCodeValidator.class)
public @interface InviteCode {
    String message() default "{error.register.wrong_invite_code}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
