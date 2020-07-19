package org.manazeak.manazeak.entity.dto.user;

import org.manazeak.manazeak.entity.validator.global.LettersOnly;
import org.manazeak.manazeak.entity.validator.user.Avatar;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;

/**
 * Contains all the information about a user after the creation of the account.
 */
public class UserFirstInfoDto {

    @Email(message = "{error.register.wrong_email}")
    private String mail;
    @LettersOnly(message = "{error.register.bad_char_name}")
    private String name;
    @LettersOnly(message = "{error.register.bad_char_surname}")
    private String surname;
    private String locale;
    private String birthDate;
    private String bio;
    private String country;
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

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public MultipartFile getAvatar() {
        return avatar;
    }

    public void setAvatar(MultipartFile avatar) {
        this.avatar = avatar;
    }
}
