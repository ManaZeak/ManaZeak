package org.manazeak.manazeak.service.security.user.info;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.configuration.security.MzkUserDetail;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.user.MzkUserDetailDto;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.manager.security.user.UserEditManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * This service is used to access the information about a user.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class UserInformationServiceImpl implements UserInformationService {

    /**
     * The service for interacting with users.
     */
    private final UserManager userManager;

    private final UserEditManager userEditManager;

    private final MzkUserDAO userDAO;

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUserDetailDto getCurrentUserInformation() {
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
        MzkUser user = userEditManager.saveCurrentUserModification(mzkUserEditDto);
        // Updating the locale of the user. Otherwise, the application isn't traduced correctly.
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof MzkUserDetail userDetail) {
            userDetail.getUser().setLocale(user.getLocale());
        }
    }
}
