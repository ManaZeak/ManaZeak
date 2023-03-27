package org.manazeak.manazeak.mock;

import org.manazeak.manazeak.constant.security.RoleEnum;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockMzkUser {

    String username() default UserTestConstants.USERNAME;

    String mail() default UserTestConstants.MAIL;

    RoleEnum role() default RoleEnum.USER;

}
