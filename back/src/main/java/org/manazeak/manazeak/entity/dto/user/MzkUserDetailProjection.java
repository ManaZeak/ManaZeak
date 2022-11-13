package org.manazeak.manazeak.entity.dto.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    LocalDateTime getMemberSince();

    String getParentAvatar();

    String getParentName();

    String getParentSurname();
}
