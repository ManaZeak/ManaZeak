package org.manazeak.manazeak.manager.security.user;

import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineProjection;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Interacts with the user for the admin.
 */
@Component
public class AdminUserManager {

    private final MzkUserDAO userDAO;

    private final UserProfileManager userProfileManager;

    public AdminUserManager(MzkUserDAO userDAO, UserProfileManager userProfileManager) {
        this.userDAO = userDAO;
        this.userProfileManager = userProfileManager;
    }

    /**
     * Get the object containing the users in a tree form.
     * @return the tree of users.
     */
    public UserHierarchyDto getUserHierarchy() {
        // Get all the users of the database.
        Iterable<MzkUser> users = userDAO.findAll();
        // Build the hierarchy of the users.
        return UserHierarchyHelper.buildUserHierarchyFromUsers(users);
    }

    /**
     * Get all the users from the database with all the information.
     * @return the user list.
     */
    public List<UserListLineDto> getUserList() {
        // Get all the users available in the database.
        List<UserListLineProjection> usersProjection = userDAO.getAllLineUsers();
        // Converting the projection object to standard users.
        return userProfileManager.convertUserListLineProjectionToDto(usersProjection);
    }
}
