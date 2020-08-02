package org.manazeak.manazeak.entity.validator.reference.country;

import org.manazeak.manazeak.service.reference.country.CountryService;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Allows to check that a country ID exists in the database.
 */
@Component
public class CountryIdValidator implements ConstraintValidator<CountryId, Long> {

    private final CountryService countryService;

    public CountryIdValidator(CountryService countryService) {
        this.countryService = countryService;
    }

    /**
     * Check that the id of the country exists in the database.
     *
     * @param countryId                  The country id to check.
     * @param constraintValidatorContext The context containing the errors.
     * @return True if the country id is valid.
     */
    @Override
    public boolean isValid(Long countryId, ConstraintValidatorContext constraintValidatorContext) {
        // The user didn't select any country. This is a valid choice.
        if (countryId == 0) {
            return true;
        }
        return countryService.isCountryIdExists(countryId);
    }
}
