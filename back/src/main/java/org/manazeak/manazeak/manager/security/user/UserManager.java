package org.manazeak.manazeak.manager.security.user;

import org.manazeak.manazeak.constant.error.ErrorEnum;
import org.manazeak.manazeak.constant.security.RoleEnum;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.RoleDAO;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Role;
import org.manazeak.manazeak.exception.MzkObjectNotFoundException;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.service.error.ErrorHandlerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;


@Component
public class UserManager {

    private static final Logger LOG = LoggerFactory.getLogger(UserManager.class);
    /**
     * The message key for the error when the user can't be found.
     */
    private static final String USER_NOT_FOUND_KEY = "user.error.not_found";
    /**
     * The title key of the error when the user can't be found.
     */
    private static final String USER_NOT_FOUND_TITLE_KEY = "user.error.not_found_title";
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
    /**
     * Handle the errors.
     */
    private final ErrorHandlerService errorHandlerService;

    public UserManager(RoleDAO roleDAO, @Lazy PasswordEncoder passEncoder, MzkUserDAO userDAO,
                       ErrorHandlerService errorHandlerService) {
        this.roleDAO = roleDAO;
        this.passEncoder = passEncoder;
        this.userDAO = userDAO;
        this.errorHandlerService = errorHandlerService;
    }

    /**
     * {@inheritDoc}
     */
    public MzkUser getCurrentUser() {
        // Getting the security context and the user.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            LOG.error("There is no connected user. Un-authenticated user shouldn't access this.");
            throw new MzkRuntimeException("error.user.not_connected", "error.user.not_connected_title");
        }
        // Getting the current username
        String currentUserName = authentication.getName();
        // Getting the user in the database.
        Optional<MzkUser> userOpt = findByUsername(currentUserName);
        if (userOpt.isEmpty()) {
            LOG.error("The username wasn't found in the database, this is not normal!");
            throw new MzkRuntimeException(USER_NOT_FOUND_KEY, USER_NOT_FOUND_TITLE_KEY);
        }
        return userOpt.get();
    }

    /**
     * {@inheritDoc}
     */
    public MzkUser insertUser(NewUserDto newUser) {
        // Getting the default role for a new user.
        Role defaultRole = roleDAO.getRoleByRoleId(RoleEnum.USER.getId());
        // Creating the user to insert.
        MzkUser user = new MzkUser();
        user.setUsername(newUser.getUsername());
        user.setPassword(passEncoder.encode(newUser.getPassword1()));
        user.setRole(defaultRole);
        user.setIsActive(true);
        user.setIsComplete(false);
        user.setCreationDate(LocalDateTime.now());
        // Saving the user in the database.
        saveUser(user);
        return user;
    }

    /**
     * Save a user into the database.
     *
     * @param user The user that will be saved.
     */
    public void saveUser(MzkUser user) {
        userDAO.save(user);
    }

    /**
     * {@inheritDoc}
     */
    public Optional<MzkUser> findByUsername(String username) {
        return userDAO.getByUsername(username);
    }

    /**
     * Get the user in the database if it exists. Throw a exception otherwise.
     *
     * @param userId the id of the user.
     * @return the user.
     */
    public MzkUser getUserById(Long userId) {
        return userDAO.findById(userId).orElseThrow(() ->
                new MzkObjectNotFoundException("No user found in database for the id :" + userId,
                        USER_NOT_FOUND_KEY, USER_NOT_FOUND_TITLE_KEY)
        );
    }

    /**
     * {@inheritDoc}
     */
    public void changeCurrentUserPassword(ResetPasswordDto newPasswords, MzkUser currentUser) {
        encryptAndSaveUserPassword(currentUser, newPasswords.getNewPassword1());
        LOG.info("The user {} changed his password.", currentUser.getUsername());
    }

    /**
     * {@inheritDoc}
     */
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
     *
     * @param user     The user to modify.
     * @param password The password to encode and to use for the user.
     */
    private void encryptAndSaveUserPassword(MzkUser user, String password) {
        String encodedPass = passEncoder.encode(password);
        user.setPassword(encodedPass);
        saveUser(user);
    }
}
