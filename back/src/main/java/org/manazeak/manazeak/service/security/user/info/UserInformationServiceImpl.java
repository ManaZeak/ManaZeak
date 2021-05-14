package org.manazeak.manazeak.service.security.user.info;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.user.MzkUserDetailProjection;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.manager.security.user.UserEditManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
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
    private final UserManager userManager;

    private final UserEditManager userEditManager;

    private final MzkUserDAO userDAO;

    public UserInformationServiceImpl(UserManager userManager, UserEditManager userEditManager, MzkUserDAO userDAO) {
        this.userManager = userManager;
        this.userEditManager = userEditManager;
        this.userDAO = userDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUserDetailProjection getCurrentUserInformation() {
        MzkUser currentUser = userManager.getCurrentUser();
        return userDAO.getUserDetailFromUserId(currentUser.getUserId());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUserEditDto getUserEditableInformation() {
        return userEditManager.getCurrentUserEdit();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void saveCurrentUserEditInformation(MzkUserEditDto mzkUserEditDto) {
        userEditManager.saveCurrentUserModification(mzkUserEditDto);
    }
}
