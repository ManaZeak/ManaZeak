package org.manazeak.manazeak.configuration.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.util.ObjectUtils;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.support.RequestContextUtils;

/**
 * This class is used to handle the locale of the user.
 */
public class MzkLocaleChangeInterceptor extends LocaleChangeInterceptor {

    /**
     * Before every request we will check the language of the user/
     *
     * @param request  the request of the user.
     * @param response the response for the user.
     * @param handler  the handler.
     * @return true if the request was handled correctly.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // Checking the http method.
        if (checkHttpMethod(request.getMethod())) {
            // Getting the local resolver of the app (MzkLocaleResolver)
            LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
            if (localeResolver == null) {
                throw new IllegalStateException("No LocaleResolver found: not in a DispatcherServlet request?");
            }
            // Setting the locale of the user.
            localeResolver.setLocale(request, response, localeResolver.resolveLocale(request));
        }

        return true;
    }

    /**
     * Checks if the http method used is correct.
     * Copied code for LocalChangeInterceptor, the méthode is final and cannot be overridden.
     *
     * @param currentMethod The HTTP method in use.
     * @return If the HTTP methode is handled.
     */
    private boolean checkHttpMethod(String currentMethod) {
        String[] configuredMethods = this.getHttpMethods();
        if (ObjectUtils.isEmpty(configuredMethods)) {
            return true;
        }
        for (String configuredMethod : configuredMethods) {
            if (configuredMethod.equalsIgnoreCase(currentMethod)) {
                return true;
            }
        }

        return false;
    }
}
