package org.manazeak.manazeak.service.security.admin;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.manager.security.user.UserProfileManager;
import org.springframework.stereotype.Service;

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


}
