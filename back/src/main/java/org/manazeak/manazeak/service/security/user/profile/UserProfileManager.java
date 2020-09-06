package org.manazeak.manazeak.service.security.user.profile;

import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineProjection;

import java.util.List;

/**
 * Manager for accessing to the user profile information.
 */
public interface UserProfileManager {

    /**
     * Convert the user lines to a DTO for displaying it in the admin page.
     *
     * @param usersProjection The list of users to convert.
     * @return The list of converted users.
     */
    List<UserListLineDto> convertUserListLineProjectionToDto(List<UserListLineProjection> usersProjection);
}
