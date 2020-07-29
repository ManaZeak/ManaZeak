package org.manazeak.manazeak.service.reference.locale;

import org.manazeak.manazeak.entity.reference.Locale;

import java.util.List;

/**
 * This service is used to manipulate the locales available in the app.
 */
public interface LocaleService {

    List<Locale> getAllLocales();
}
