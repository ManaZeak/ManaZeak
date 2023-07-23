package org.manazeak.manazeak.entity.dto.user;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.manazeak.manazeak.entity.validator.global.Date;
import org.manazeak.manazeak.entity.validator.global.Name;
import org.manazeak.manazeak.entity.validator.reference.country.CountryId;
import org.manazeak.manazeak.entity.validator.reference.locale.LocaleId;

/**
 * Contains the editable information about a user.
 */
@Data
public class MzkUserEditDto {

    @Email(message = "{user.tellusmore.error.wrong_email}")
    private String email;

    @Name(message = "{user.tellusmore.error.bad_char_name}")
    private String name;

    @Name(message = "{user.tellusmore.error.bad_char_surname}")
    private String surname;

    private String bio;

    @LocaleId
    private Long localeId;

    @NotEmpty(message = "{user.tellusmore.error.empty_birthdate}")
    @Date
    private String birthdate;

    @CountryId
    private Long countryId;

}
