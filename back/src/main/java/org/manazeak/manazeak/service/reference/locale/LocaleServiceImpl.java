package org.manazeak.manazeak.service.reference.locale;

import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.reference.LocaleDAO;
import org.manazeak.manazeak.entity.reference.Locale;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This service is used to manipulate the available locales in the app.
 */
@Service
@TransactionalWithRollback
public class LocaleServiceImpl implements LocaleService {

    private final LocaleDAO localeDAO;

    public LocaleServiceImpl(LocaleDAO localeDAO) {
        this.localeDAO = localeDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Locale> getAllLocales() {
        List<Locale> locales = new ArrayList<>();
        // Add all the locales to the list.
        localeDAO.findAll().forEach(locales::add);
        return locales;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void setUserLocale(Long localeId, MzkUser user) {
        // Getting the specified local.
        Optional<Locale> locale = localeDAO.findById(localeId);
        if (locale.isEmpty()) {
            throw new MzkRuntimeException("user.locale.not_found", "user.locale.not_found_title");
        }
        // Setting the locale on the user.
        user.setLocale(locale.get());
    }
}
