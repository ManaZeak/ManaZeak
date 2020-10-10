package org.manazeak.manazeak.service.reference.locale;

import org.manazeak.manazeak.entity.reference.Locale;
import org.manazeak.manazeak.entity.security.MzkUser;

import java.util.List;

/**
 * This service is used to manipulate the locales available in the app.
 */
public interface LocaleService {

    /**
     * Get all the locales available in the database.
     *
     * @return all the available locales.
     */
    List<Locale> getAllLocales();

    /**
     * Set the locale of a user.
     */
    void setUserLocale(Long localeId, MzkUser user);
}
