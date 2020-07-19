package org.manazeak.manazeak.configuration.web;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.security.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;
import java.util.Optional;

/**
 * This class allows to select the local for a given user.
 * If there is no user, we select the user agent language.
 */
@Configuration
public class MzkLocalResolver extends SessionLocaleResolver {

    private static final Logger LOG = LoggerFactory.getLogger(MzkLocalResolver.class);
    // Using Autowired, because we need to instantiate this class in a config file.
    @Autowired
    private UserService userService;

    /**
     * Choose the local displayed of the user. The local is chosen from :
     * - the user object stored in the database.
     * - the user-agent if no user is logged in.
     *
     * @param request the request of the user.
     * @return The local of the user.
     */
    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        // Getting the security context of the application.
        SecurityContext securityContext = SecurityContextHolder.getContext();
        // Getting the name of the user.
        String userName = securityContext.getAuthentication().getName();
        // If there is no user connected, getting the information from the user agent.
        if ("anonymousUser".equals(userName)) {
            return getLocalFromRequestHeader(request);
        }
        // Getting the user from the database.
        Optional<MzkUser> user = userService.findByUsername(userName);
        if (user.isEmpty()) {
            LOG.warn("A user has no user name and is connected.");
            return Locale.US;
        }
        if (user.get().getLocale() != null) {
            return getAvailableLocale(Locale.forLanguageTag(user.get().getLocale()));
        } else {
            return getAvailableLocale(null);
        }
    }

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
        switch (languageCode) {
            case "fr":
                return Locale.FRANCE;
            default:
                return Locale.US;
        }
    }
}
