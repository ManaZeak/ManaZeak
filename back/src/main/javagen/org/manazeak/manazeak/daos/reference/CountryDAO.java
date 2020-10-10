package org.manazeak.manazeak.daos.reference;

import org.manazeak.manazeak.entity.dto.country.CountrySelectProjection;
import org.manazeak.manazeak.entity.reference.Country;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Country using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface CountryDAO extends CrudRepository<Country, Long> {

    @Query("select countryId as id, name as name from Country")
    List<CountrySelectProjection> getAllCountrySelect();

    /**
     * Get a country by it's id.
     * @param countryId the id of the country.
     * @return A country if it exists.
     */
    Optional<Country> getCountryByCountryId(Long countryId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT