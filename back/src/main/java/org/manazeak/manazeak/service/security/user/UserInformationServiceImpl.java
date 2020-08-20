package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.user.MzkUserDetailProjection;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.stereotype.Service;

/**
 * This service is used to access the information about a user.
 */
@Service
@TransactionnalWithRollback
public class UserInformationServiceImpl implements UserInformationService {

    /**
     * The service for interacting with users.
     */
    private final UserService userService;

    private final MzkUserDAO userDAO;

    public UserInformationServiceImpl(UserService userService, MzkUserDAO userDAO) {
        this.userService = userService;
        this.userDAO = userDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUserDetailProjection getCurrentUserInformation() {
        MzkUser currentUser = userService.getCurrentUser();
        return userDAO.getUserDetailById(currentUser.getUserId());
    }
}
