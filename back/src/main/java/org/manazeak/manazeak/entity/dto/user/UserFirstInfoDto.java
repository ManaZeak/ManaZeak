package org.manazeak.manazeak.entity.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.manazeak.manazeak.entity.validator.global.Date;
import org.manazeak.manazeak.entity.validator.global.LettersOnly;
import org.manazeak.manazeak.entity.validator.reference.country.CountryId;
import org.manazeak.manazeak.entity.validator.reference.locale.LocaleId;
import org.manazeak.manazeak.entity.validator.user.Avatar;
import org.springframework.web.multipart.MultipartFile;

/**
 * Contains all the information about a user after the creation of the account.
 */
@Data
public class UserFirstInfoDto {

    @Email(message = "{user.tellusmore.error.wrong_email}")
    private String mail;
    @LettersOnly(message = "{user.tellusmore.error.bad_char_name}")
    private String name;
    @LettersOnly(message = "{user.tellusmore.error.bad_char_surname}")
    private String surname;
    @LocaleId
    private Long localeId;
    @NotEmpty(message = "{user.tellusmore.error.empty_birthdate}")
    @Date
    private String birthDate;
    private String bio;
    @CountryId
    private Long countryId;
    @Avatar
    private MultipartFile avatar;

}
