package org.manazeak.manazeak.configuration.security.rest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.manazeak.manazeak.configuration.security.SecurityUtil;
import org.manazeak.manazeak.exception.MzkSecurityException;
import org.springframework.stereotype.Component;

/**
 * Aspect for managing the security from a annotation.
 */
@Aspect
@Component
public class RestSecurityAspect {

    /**
     * Interceptor for adding security arround the @RestSecurity annotation.
     *
     * @param pjp Junction point.
     * @return the call.
     * @throws Throwable The function returned an error or the user doesn't have the right.
     */
    @Around("@annotation(org.manazeak.manazeak.configuration.security.rest.RestSecurity)")
    public Object intercept(final ProceedingJoinPoint pjp) throws Throwable {
        MethodSignature sig = (MethodSignature) pjp.getSignature();
        RestSecurity securityAnnotation = sig.getMethod().getAnnotation(RestSecurity.class);

        if (SecurityUtil.currentUserHasPrivilege(securityAnnotation.value())) {
            return pjp.proceed(pjp.getArgs());
        } else {
            // Throwing exception for the controller.
            throw new MzkSecurityException("error.permission.notification.title",
                    "error.permission.notification.message");
        }
    }
}
