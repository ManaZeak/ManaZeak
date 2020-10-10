package org.manazeak.manazeak.entity.dto.admin;

import java.time.LocalDateTime;

/**
 * This projection is used to get the data from the database.
 */
public interface UserListLineProjection {

    String getUsername();

    String getAvatar();

    LocalDateTime getCreationDate();

    Long getRoleId();

    boolean getIsActive();
}
