package org.manazeak.manazeak.service.reference.locale;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.notification.reference.locale.LocaleNotificationEnum;
import org.manazeak.manazeak.daos.reference.LocaleDAO;
import org.manazeak.manazeak.entity.reference.Locale;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This service is used to manipulate the available locales in the app.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class LocaleService {

    private final LocaleDAO localeDAO;

    /**
     * Get all the locales available in the database.
     *
     * @return all the available locales.
     */
    public List<Locale> getAllLocales() {
        List<Locale> locales = new ArrayList<>();
        // Add all the locales to the list.
        localeDAO.findAll().forEach(locales::add);
        return locales;
    }

    /**
     * Get the locale from its code.
     *
     * @param code The code of the locale.
     * @return The locale object.
     */
    @Cacheable("localeCache")
    public Optional<Locale> getLocaleByCode(String code) {
        return localeDAO.findLocaleByCode(code);
    }

    /**
     * Set the locale of a user.
     *
     * @param localeId The id of the locale.
     * @param user     The user associated to the locale.
     */
    public void setUserLocale(Long localeId, MzkUser user) {
        // Getting the specified local.
        Optional<Locale> locale = localeDAO.findById(localeId);
        if (locale.isEmpty()) {
            throw new MzkRuntimeException("The locale asked by the user wasn't found.",
                    LocaleNotificationEnum.LOCALE_NOT_FOUND_ERROR);
        }
        // Setting the locale on the user.
        user.setLocale(locale.get());
    }
}
