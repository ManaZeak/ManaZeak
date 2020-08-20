package org.manazeak.manazeak.entity.dto.user;

import java.time.LocalDate;

/**
 * This object contains all the information for a user.
 */
public interface MzkUserDetailProjection {

    String getUsername();

    String getName();

    String getSurname();

    String getEmail();

    String getCountry();

    String getLocale();

    String getInviteCode();

    String getBio();

    LocalDate getBirthDate();

    String getAvatar();
}
