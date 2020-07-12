package org.manazeak.manazeak.entity.dto.user;

import org.manazeak.manazeak.entity.validator.global.LettersOnly;
import org.manazeak.manazeak.entity.validator.user.InviteCode;
import org.manazeak.manazeak.entity.validator.user.PasswordMatches;
import org.manazeak.manazeak.entity.validator.user.UniqueUsername;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

/**
 * This class represents a new user trying to create an account.
 */
@PasswordMatches
public class NewUserDto implements PasswordContainer {

    @NotEmpty(message = "{error.register.empty_username}")
    @UniqueUsername
    private String username;
    @NotEmpty(message = "{error.register.empty_pass}")
    private String password1;
    @NotEmpty(message = "{error.register.empty_pass}")
    private String password2;
    @NotEmpty(message = "{error.register.empty_email}")
    @Email(message = "{error.register.wrong_email}")
    private String mail;
    @LettersOnly(message = "{error.register.bad_char_name}")
    private String name;
    @LettersOnly(message = "{error.register.bad_char_surname}")
    private String surname;
    private String locale;
    private String birthDate;
    private String bio;
    @NotEmpty(message = "{error.register.empty_invite_code}")
    @InviteCode
    private String inviteCode;
    private String country;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword1() {
        return password1;
    }

    public void setPassword1(String password1) {
        this.password1 = password1;
    }

    @Override
    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
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

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
