package org.manazeak.manazeak.entity.dto.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * This object contains all the information for a user.
 */
public record MzkUserDetailDto(String username,
                               String name,
                               String surname,
                               String email,
                               String country,
                               String locale,
                               String inviteCode,
                               String bio,
                               LocalDate birthDate,
                               String avatar,
                               LocalDateTime memberSince,
                               String parentAvatar,
                               String parentName,
                               String parentSurname) {}
