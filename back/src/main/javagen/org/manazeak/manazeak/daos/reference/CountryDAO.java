package org.manazeak.manazeak.daos.reference;

import org.manazeak.manazeak.entity.dto.country.CountryCodeDto;
import org.manazeak.manazeak.entity.dto.country.CountrySelectDto;
import org.manazeak.manazeak.entity.reference.Country;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Country using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface CountryDAO extends CrudRepository<Country, Long> {

    @Query("""
            select new org.manazeak.manazeak.entity.dto.country.CountrySelectDto(
                name,
                countryId
            )
            from Country
            """)
    List<CountrySelectDto> getAllCountrySelect();

    /**
     * Fetch all the countries matching the given list of trigrams.
     *
     * @param trigrams The list of trigrams used to filter the countries.
     * @return The countries.
     */
    @Query("""
            select new org.manazeak.manazeak.entity.dto.country.CountryCodeDto(
                c.countryId,
                c.trigram
            ) from Country c
            where c.trigram in :trigrams
            """)
    List<CountryCodeDto> getCountriesByTrigrams(@Param("trigrams") Collection<String> trigrams);

    /**
     * Get a country by its id.
     *
     * @param countryId the id of the country.
     * @return A country if it exists.
     */
    Optional<Country> getCountryByCountryId(Long countryId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT