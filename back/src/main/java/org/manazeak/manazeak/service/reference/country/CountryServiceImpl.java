package org.manazeak.manazeak.service.reference.country;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.reference.CountryDAO;
import org.manazeak.manazeak.entity.dto.country.CountrySelectProjection;
import org.manazeak.manazeak.entity.reference.Country;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Handles the actions with the countries.
 */
@Service
@TransactionnalWithRollback
public class CountryServiceImpl implements CountryService {

    private final CountryDAO countryDAO;

    public CountryServiceImpl(CountryDAO countryDAO) {
        this.countryDAO = countryDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<CountrySelectProjection> getCountryList() {
        return countryDAO.getAllCountrySelect();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isCountryIdExists(Long countryId) {
        return countryDAO.getCountryByCountryId(countryId).isPresent();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Country getCountryById(Long countryId) {
        return countryDAO.getCountryByCountryId(countryId)
                .orElseThrow(MzkExceptionHelper.generateMzkRuntimeException("reference.country.error.not_found",
                        "reference.country.error.not_found_title"));
    }
}
