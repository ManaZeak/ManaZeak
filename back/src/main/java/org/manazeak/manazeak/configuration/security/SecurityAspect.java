package org.manazeak.manazeak.configuration.security;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Aspect for managing the security from a annotation.
 */
@Aspect
@Component
public class SecurityAspect {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityAspect.class);

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
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            final String username;
            if (authentication instanceof AnonymousAuthenticationToken) {
                username = "ANONYMOUS_USER";
            } else {
                username = authentication.getName();
            }
            LOG.error("Permission error for the user : {}", username);
            return "error/permissionError.html";
        }
    }
}
