package org.manazeak.manazeak.entity.dto.user;


import org.manazeak.manazeak.entity.validator.global.Date;
import org.manazeak.manazeak.entity.validator.global.LettersOnly;
import org.manazeak.manazeak.entity.validator.reference.country.CountryId;
import org.manazeak.manazeak.entity.validator.reference.locale.LocaleId;
import org.manazeak.manazeak.entity.validator.user.Avatar;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;

/**
 * Contains the editable information about a user.
 */
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Long getLocaleId() {
        return localeId;
    }

    public void setLocaleId(Long localeId) {
        this.localeId = localeId;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public MultipartFile getAvatar() {
        return avatar;
    }

    public void setAvatar(MultipartFile avatar) {
        this.avatar = avatar;
    }
}
