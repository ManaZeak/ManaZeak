package org.manazeak.manazeak.entity.validator.reference.locale;

import org.manazeak.manazeak.daos.reference.LocaleDAO;
import org.manazeak.manazeak.entity.reference.Locale;
import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Optional;

@Component
public class LocaleIdValidator implements ConstraintValidator<LocaleId, Long> {

    private final LocaleDAO localeDAO;

    public LocaleIdValidator(LocaleDAO localeDAO) {
        this.localeDAO = localeDAO;
    }

    /**
     * Check if a locale id exists in the database or not.
     *
     * @param localeId                   The locale id to check
     * @param constraintValidatorContext the context containing the errors.
     * @return is the country is valid or not.
     */
    @Override
    public boolean isValid(Long localeId, ConstraintValidatorContext constraintValidatorContext) {
        // If the user didn't choose any local we skip this test
        if (localeId == 0) {
            return true;
        }
        Optional<Locale> locale = localeDAO.findById(localeId);
        // If the locale is in the database -> ok.
        return locale.isPresent();
    }
}
