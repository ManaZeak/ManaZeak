package org.manazeak.manazeak.configuration.web;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.Optional;

/**
 * Used to resolve the local, this is class is externalized for the annotation to work.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class MzkCachedLocaleResolver {

    private final UserService userService;

    /**
     * Check if the local is available and send a fallback if not.
     *
     * @param askedLocale the locale we want to display.
     * @return the available locale.
     */
    @NonNull
    public static Locale getAvailableLocale(Locale askedLocale) {
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
     * Get the user from the database and resolve the locale set.
     * This is cached to avoid spamming the database with requests.
     *
     * @param username The name of the user requesting the locale.
     * @return The locale of the user if one is set.
     */
    @Cacheable(value = "user_locale", key = "#username")
    public Optional<Locale> resolveUserLocale(final String username) {
        // If the user has a locale set in his profile, load the complete user.
        MzkUser dbUser = userService.findByUsername(username).orElseThrow();

        // No locale set in the user, letting the browser choose.
        if (dbUser.getLocale() == null) {
            return Optional.empty();
        }

        // Setting the local of the user.
        return Optional.of(
                getAvailableLocale(Locale.forLanguageTag(dbUser.getLocale().getCode()))
        );
    }

}
