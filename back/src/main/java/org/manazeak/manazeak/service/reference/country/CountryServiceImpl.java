package org.manazeak.manazeak.service.reference.country;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.notification.reference.country.CountryNotificationEnum;
import org.manazeak.manazeak.daos.reference.CountryDAO;
import org.manazeak.manazeak.entity.dto.country.CountrySelectDto;
import org.manazeak.manazeak.entity.reference.Country;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Handles the actions with the countries.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryDAO countryDAO;

    /**
     * {@inheritDoc}
     */
    @Override
    public List<CountrySelectDto> getCountryList() {
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
                .orElseThrow(MzkExceptionHelper.generateMzkRuntimeException("The country wasn't found in the database.",
                        CountryNotificationEnum.COUNTRY_NOT_FOUND_ERROR));
    }
}
