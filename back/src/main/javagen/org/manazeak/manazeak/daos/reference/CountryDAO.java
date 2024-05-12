package org.manazeak.manazeak.daos.reference;

import org.manazeak.manazeak.entity.dto.country.CountrySelectDto;
import org.manazeak.manazeak.entity.reference.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Country using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface CountryDAO extends JpaRepository<Country, Long> {

    @Query("""
            select new org.manazeak.manazeak.entity.dto.country.CountrySelectDto(
                name,
                countryId
            )
            from Country
            """)
    List<CountrySelectDto> getAllCountrySelect();

    /**
     * Get a country by its id.
     *
     * @param countryId the id of the country.
     * @return A country if it exists.
     */
    Optional<Country> getCountryByCountryId(Long countryId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT