package org.manazeak.manazeak.entity.dto.user;


import jakarta.validation.constraints.Email;
import lombok.Data;
import org.manazeak.manazeak.entity.validator.global.Date;
import org.manazeak.manazeak.entity.validator.global.LettersOnly;
import org.manazeak.manazeak.entity.validator.reference.country.CountryId;
import org.manazeak.manazeak.entity.validator.reference.locale.LocaleId;
import org.manazeak.manazeak.entity.validator.user.Avatar;
import org.springframework.web.multipart.MultipartFile;

/**
 * Contains the editable information about a user.
 */
@Data
public class MzkUserEditDto {

    @Email(message = "{user.tellusmore.error.wrong_email}")
    private String email;

    @LettersOnly(message = "{user.tellusmore.error.bad_char_name}")
    private String name;

    @LettersOnly(message = "{user.tellusmore.error.bad_char_surname}")
    private String surname;

    private String bio;

    @LocaleId
    private Long localeId;

    @Date
    private String birthdate;

    @CountryId
    private Long countryId;

    @Avatar
    private MultipartFile avatar;

}
