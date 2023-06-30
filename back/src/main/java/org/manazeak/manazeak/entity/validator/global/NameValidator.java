package org.manazeak.manazeak.entity.validator.global;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class NameValidator implements ConstraintValidator<Name, String> {

    private static final Pattern PATTERN = Pattern.compile("^[\\w'\\-,.][^0-9_!¡?÷?¿\\/\\\\+=@#$%ˆ&*(){}|~<>;:[\\\\]]{2,}$");

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
