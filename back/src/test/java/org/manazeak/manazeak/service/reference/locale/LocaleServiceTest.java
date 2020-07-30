package org.manazeak.manazeak.service.reference.locale;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.entity.reference.Locale;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * This class allows us to test the locales.
 */
class LocaleServiceTest extends AbstractManaZeakTest {

    @Autowired
    private LocaleService localeService;

    @Test
    void testGetAllLocales() {
        List<Locale> locales = localeService.getAllLocales();
        Assertions.assertEquals(2, locales.size(), "The number of available locales is not expected.");
    }
}
