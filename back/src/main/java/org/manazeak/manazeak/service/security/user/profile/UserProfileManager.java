package org.manazeak.manazeak.service.security.user.profile;

import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineProjection;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Manager for accessing to the user profile information.
 */
@Service
public class UserProfileManager {

    private static final String ROLE_REFERENCE_KEY = "reference.role.";

    /**
     * The message source for the internationalization of the message.
     */
    private final MessageSource messageGetter;

    public UserProfileManager(MessageSource messageSource) {
        this.messageGetter = messageSource;
    }

    /**
     * Convert the user lines to a DTO for displaying it in the admin page.
     *
     * @param usersProjection The list of users to convert.
     * @return The list of converted users.
     */
    public List<UserListLineDto> convertUserListLineProjectionToDto(List<UserListLineProjection> usersProjection) {
        List<UserListLineDto> users = new ArrayList<>();

        // Converting users one by one.
        for (UserListLineProjection userProjection : usersProjection) {
            UserListLineDto user = convertUserListLineProjection(userProjection);
            users.add(user);
        }

        // Returning the converted users.
        return users;
    }

    /**
     * Convert a single user into a DTO.
     *
     * @return The converted user.
     */
    private UserListLineDto convertUserListLineProjection(UserListLineProjection userProjection) {
        UserListLineDto user = new UserListLineDto();
        user.setActive(userProjection.getIsActive());
        user.setAvatar(userProjection.getAvatar());
        user.setCreationDate(userProjection.getCreationDate());
        user.setUsername(userProjection.getUsername());
        // Get string for the user role by it's id.
        user.setRoleValue(getRoleValueFromId(userProjection.getRoleId()));

        return user;
    }

    /**
     * Get the role value of a user from it's id value.
     *
     * @param roleId The id of the role of the user.
     * @return The string containing the role name of the user.
     */
    private String getRoleValueFromId(Long roleId) {
        return messageGetter.getMessage(ROLE_REFERENCE_KEY + roleId, null, LocaleContextHolder.getLocale());
    }
}
