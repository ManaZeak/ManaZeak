package org.manazeak.manazeak.manager.library.country;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.reference.CountryDAO;
import org.manazeak.manazeak.entity.dto.country.CountryCodeDto;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Allows interacting with the countries of the application.
 */
@Component
@RequiredArgsConstructor
public class CountryManager {

    private final CountryDAO countryDAO;

    /**
     * Build a map associating trigrams with a country id.
     *
     * @param trigrams The trigrams to fetch in the database.
     * @return A map associating the country trigram with its identifier.
     */
    public Map<String, Long> getTrigramMapFromTrigramList(Collection<String> trigrams) {
        Map<String, Long> trigramMap = new HashMap<>();
        // Fetching all the countries.
        List<CountryCodeDto> countries = countryDAO.getCountriesByTrigrams(trigrams);
        for (CountryCodeDto country : countries) {
            trigramMap.put(country.trigram(), country.id());
        }

        return trigramMap;
    }

}
