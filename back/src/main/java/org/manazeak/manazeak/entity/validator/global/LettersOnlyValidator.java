package org.manazeak.manazeak.entity.validator.global;

import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Component
public class LettersOnlyValidator implements ConstraintValidator<LettersOnly, String> {

    private static final Pattern PATTERN = Pattern.compile("^[a-zA-Z]+$");

    @Override
    public boolean isValid(String string, ConstraintValidatorContext constraintValidatorContext) {
        // If the string is null there is no bad characters.
        if (string == null || string.isEmpty()) {
            return true;
        }
        // Checking if the given string contains only letters.
        return PATTERN.matcher(string).matches();
    }
}
