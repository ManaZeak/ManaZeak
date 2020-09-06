package org.manazeak.manazeak.service.security.admin;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineProjection;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.security.user.profile.UserProfileManager;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This class is used to manipulate the users for the admin page.
 */
@Service
@TransactionnalWithRollback
public class AdminUserServiceImpl implements AdminUserService {

    private final MzkUserDAO mzkUserDAO;

    private final UserProfileManager userProfileManager;

    public AdminUserServiceImpl(MzkUserDAO mzkUserDAO, UserProfileManager userProfileManager) {
        this.mzkUserDAO = mzkUserDAO;
        this.userProfileManager = userProfileManager;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserHierarchyDto getUserHierarchy() {
        // Get all the users of the database.
        Iterable<MzkUser> users = mzkUserDAO.findAll();
        // Build the hierarchy of the users.
        return UserHierarchyHelper.buildUserHierarchyFromUsers(users);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UserListLineDto> getUserList() {
        // Get all the users available in the database.
        List<UserListLineProjection> usersProjection = mzkUserDAO.getAllLineUsers();
        // Converting the projection object to standard users.
        return userProfileManager.convertUserListLineProjectionToDto(usersProjection);
    }
}
