package org.manazeak.manazeak.configuration.security;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

/**
 * Aspect for managing the security from a annotation.
 */
@Aspect
@Component
public class SecurityAspect {

    /**
     * Interceptor for adding security arround the @Security annotation.
     *
     * @param pjp Junction point.
     * @return the call.
     * @throws Throwable The function returned an error or the user doesn't have the right.
     */
    @Around("@annotation(org.manazeak.manazeak.configuration.security.Security)")
    public Object intercept(final ProceedingJoinPoint pjp) throws Throwable {
        MethodSignature sig = (MethodSignature) pjp.getSignature();
        Security securityAnnotation = sig.getMethod().getAnnotation(Security.class);

        if (SecurityUtil.currentUserHasPrivilege(securityAnnotation.value())) {
            return pjp.proceed(pjp.getArgs());
        } else {
            throw new AccessDeniedException("The privilege " + securityAnnotation.value()
                    + " is required to access this feature.");

        }
    }
}
