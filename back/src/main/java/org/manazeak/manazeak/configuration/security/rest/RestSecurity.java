package org.manazeak.manazeak.configuration.security.rest;

import org.manazeak.manazeak.constant.security.PrivilegeEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation for security control on controllers.
 * This is the equivalent of @PreAuthorize("hasAuthority(T(org.manazeak.manazeak.constant.security.PrivilegeEnum).XXXX)")
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RestSecurity {
    PrivilegeEnum value();
}
