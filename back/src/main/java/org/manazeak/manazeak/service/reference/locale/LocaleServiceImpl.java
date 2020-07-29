package org.manazeak.manazeak.service.reference.locale;

import org.manazeak.manazeak.daos.reference.LocaleDAO;
import org.manazeak.manazeak.entity.reference.Locale;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * This service is used to manipulate the available locales in the app.
 */
@Service
public class LocaleServiceImpl implements LocaleService {

    private final LocaleDAO localeDAO;

    public LocaleServiceImpl(LocaleDAO localeDAO) {
        this.localeDAO = localeDAO;
    }

    /**
     * Get all the locales available in the app.
     *
     * @return the locales.
     */
    @Override
    public List<Locale> getAllLocales() {
        List<Locale> locales = new ArrayList<>();
        // Add all the locales to the list.
        localeDAO.findAll().forEach(locales::add);
        return locales;
    }
}
