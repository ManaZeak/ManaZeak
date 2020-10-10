package org.manazeak.manazeak.entity.dto.user;

import org.manazeak.manazeak.entity.validator.global.Date;
import org.manazeak.manazeak.entity.validator.global.LettersOnly;
import org.manazeak.manazeak.entity.validator.reference.country.CountryId;
import org.manazeak.manazeak.entity.validator.reference.locale.LocaleId;
import org.manazeak.manazeak.entity.validator.user.Avatar;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

/**
 * Contains all the information about a user after the creation of the account.
 */
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

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
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

    public Long getLocaleId() {
        return localeId;
    }

    public void setLocaleId(Long localeId) {
        this.localeId = localeId;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
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
