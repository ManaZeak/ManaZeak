package org.manazeak.manazeak.service.reference.country;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.entity.reference.Country;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * This class allows to test the country service.
 */
class CountryServiceTest extends AbstractManaZeakTest {

    @Autowired
    private CountryService countryService;

    /**
     * Test that an existing country is found.
     */
    @Test
    void testIsCountryExistOk() {
        Assertions.assertTrue(countryService.isCountryIdExists(1L), "An existing country hasn't been found.");
    }

    /**
     * Test that a non existing country is not returned as existing.
     */
    @Test
    void testIsCountryExistKo() {
        Assertions.assertFalse(countryService.isCountryIdExists(10000L), "This country shouldn't exist.");
    }

    /**
     * Test that the country are ok in the database.
     */
    @Test
    void testGetCountryByIdOk() {
        Country country = countryService.getCountryById(1L);
        Assertions.assertEquals("Afghanistan", country.getName());
        Assertions.assertEquals("AFG", country.getTrigram());
        Assertions.assertEquals("Kabul", country.getCapitalName());
        Assertions.assertEquals(34.555347, country.getCapitalLat());
        Assertions.assertEquals(33.947006, country.getCenterLat());
    }

    /**
     * Test that when a country isn't found an exception is thrown.
     */
    @Test
    void testGetCountryByIdKo() {
        try {
            countryService.getCountryById(10000L);
        } catch (MzkRuntimeException e) {
            return;
        }
        Assertions.fail("The app must throw an exception.");
    }
}
