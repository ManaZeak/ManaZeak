package org.manazeak.manazeak.service.security.admin;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.stereotype.Service;

/**
 * This class is used to manipulate the users for the admin page.
 */
@Service
@TransactionnalWithRollback
public class AdminUserServiceImpl implements AdminUserService {

    private final MzkUserDAO mzkUserDAO;

    public AdminUserServiceImpl(MzkUserDAO mzkUserDAO) {
        this.mzkUserDAO = mzkUserDAO;
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
}
