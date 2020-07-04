package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.constant.errors.ErrorEnum;
import org.manazeak.manazeak.constant.security.RoleEnum;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.RoleDAO;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Role;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.service.error.ErrorHandlerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@TransactionnalWithRollback
public class UserManagerImpl implements UserManager {

    private static final Logger LOG = LoggerFactory.getLogger(UserManagerImpl.class);
    /**
     * Used to manipulate the roles in the database.
     */
    private final RoleDAO roleDAO;
    /**
     * Used to manipulate the user in the database.
     */
    private final MzkUserDAO userDAO;
    /**
     * The Service to encode the password.
     */
    private final PasswordEncoder passEncoder;
    private final ErrorHandlerService errorHandlerService;

    public UserManagerImpl(RoleDAO roleDAO, @Lazy PasswordEncoder passEncoder, MzkUserDAO userDAO,
                           ErrorHandlerService errorHandlerService) {
        this.roleDAO = roleDAO;
        this.passEncoder = passEncoder;
        this.userDAO = userDAO;
        this.errorHandlerService = errorHandlerService;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUser insertUser(NewUserDto newUser) {
        // Getting the default role for a new user.
        Role defaultRole = roleDAO.getRoleByRoleId(RoleEnum.USER.getId());
        // Creating the user to insert.
        MzkUser user = UserHelper.loadMzkUserFromNewUser(newUser);
        user.setPassword(passEncoder.encode(newUser.getPassword1()));
        user.setRole(defaultRole);
        user.setIsActive(true);
        // Saving the user in the database.
        userDAO.save(user);
        return user;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void changeCurrentUserPassword(ResetPasswordDto newPasswords, MzkUser currentUser) {
        encryptAndSaveUserPassword(currentUser, newPasswords.getNewPassword1());
        LOG.info("The user {} changed his password.", currentUser.getUsername());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void changeUserPassword(ResetUserPasswordDto resetUserPassword) throws MzkRestException {
        // Getting the user from the id.
        Optional<MzkUser> user = userDAO.findById(resetUserPassword.getUserId());
        if (user.isPresent()) {
            encryptAndSaveUserPassword(user.get(), resetUserPassword.getPassword());
        } else {
            // If the user wasn't found.
            errorHandlerService.generateRestErrorFromErrorEnum(ErrorEnum.USER_NOT_FOUND);
        }
    }

    /**
     * Change the password of a user.
     */
    private void encryptAndSaveUserPassword(MzkUser user, String password) {
        String encodedPass = passEncoder.encode(password);
        user.setPassword(encodedPass);
        userDAO.save(user);
    }
}
