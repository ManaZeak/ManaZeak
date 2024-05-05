package org.manazeak.manazeak.configuration.web;

import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.configuration.security.MzkUserDetail;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

/**
 * This class allows to select the local for a given user.
 * If there is no user, we select the user agent language.
 */
@Component
@RequiredArgsConstructor
@TransactionalWithRollback
@Slf4j
public class MzkLocalResolver extends SessionLocaleResolver {

    private final MzkCachedLocaleResolver mzkCachedLocaleResolver;

    /**
     * Get the local from the user agent.
     *
     * @param request the user request.
     * @return the local of the user.
     */
    private static Locale getLocalFromRequestHeader(HttpServletRequest request) {
        // Checking if the header for the language is present
        if (request.getHeader("Accept-Language") == null) {
            // Return english as a default language.
            return Locale.US;
        }
        // The user has the header checking if the language exists.
        return MzkCachedLocaleResolver.getAvailableLocale(request.getLocale());
    }

    /**
     * Choose the local displayed of the user. The local is chosen from :
     * - the user object stored in the database.
     * - the user-agent if no user is logged in.
     *
     * @param request the request of the user.
     * @return The local of the user.
     */
    @Override
    @NonNull
    public Locale resolveLocale(@NonNull HttpServletRequest request) {
        // Getting the name of the user.
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // If there is no user connected, getting the information from the user agent.
        if (auth instanceof AnonymousAuthenticationToken) {
            return getLocalFromRequestHeader(request);
        }
        // Getting the username from the security context.
        MzkUser user = ((MzkUserDetail) auth.getPrincipal()).getUser();

        // Resolving the user locale, if not found, use the information provided by the browser.
        return mzkCachedLocaleResolver.resolveUserLocale(user)
                .orElseGet(() -> getLocalFromRequestHeader(request));
    }
}
