package org.manazeak.manazeak.service.reference.country;

import org.manazeak.manazeak.entity.dto.country.CountrySelectDto;
import org.manazeak.manazeak.entity.reference.Country;

import java.util.List;

/**
 * Handles the country manipulation.
 */
public interface CountryService {

    /**
     * Get the list of available country
     *
     * @return get the list of countries.
     */
    List<CountrySelectDto> getCountryList();

    /**
     * Check if a country id is present in the database.
     *
     * @param countryId the id of the country to check.
     * @return true if the country exists false otherwise.
     */
    boolean isCountryIdExists(Long countryId);

    /**
     * Get a country by it's id.
     *
     * @param countryId the id of the country.
     * @return The country corresponding to the id.
     */
    Country getCountryById(Long countryId);
}
