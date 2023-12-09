package org.manazeak.manazeak.configuration.web;

import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.configuration.security.MzkUserDetail;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

/**
 * This class allows selecting the local for a given user.
 * If there is no user, we select the user agent language.
 */
@Component
@RequiredArgsConstructor
@TransactionalWithRollback
@Slf4j
public class MzkLocalResolver extends SessionLocaleResolver {

    private final UserService userService;

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
        return getAvailableLocale(request.getLocale());
    }

    /**
     * Check if the local is available and send a fallback if not.
     *
     * @param askedLocale the locale we want to display.
     * @return the available locale.
     */
    private static Locale getAvailableLocale(Locale askedLocale) {
        final String languageCode;
        // Getting the language code if there is one.
        if (askedLocale != null) {
            languageCode = askedLocale.getLanguage();
        } else {
            languageCode = "";
        }
        // Checking the language code and choosing the available language.
        if (languageCode.equals("fr")) {
            return Locale.FRANCE;
        }
        return Locale.US;
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
    public Locale resolveLocale(@NonNull HttpServletRequest request) {
        // Getting the name of the user.
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // If there is no user connected, getting the information from the user agent.
        if (auth instanceof AnonymousAuthenticationToken) {
            return getLocalFromRequestHeader(request);
        }
        // Getting the username from the security context.
        MzkUser user = ((MzkUserDetail) auth.getPrincipal()).getUser();
        if (user == null) {
            log.warn("A user has no user name and is connected.");
            return Locale.US;
        }
        // Database user.
        if (user.getLocale() != null) {
            // If the user has a locale set in his profile, load the complete user.
            user = userService.findByUsername(user.getUsername()).orElseThrow();
            return getAvailableLocale(Locale.forLanguageTag(user.getLocale().getCode()));
        } else {
            return getLocalFromRequestHeader(request);
        }
    }
}
