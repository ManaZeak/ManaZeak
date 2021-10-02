package org.manazeak.manazeak.configuration.security;

import org.manazeak.manazeak.constant.notification.user.UserNotificationEnum;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.service.security.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This class allows users to login into the application.
 */
@Service
public class MzkUserDetailServiceImpl implements UserDetailsService {

    private static final Logger LOG = LoggerFactory.getLogger(MzkUserDetailServiceImpl.class);
    private final UserService userService;

    public MzkUserDetailServiceImpl(final UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        if (username == null || "".equals(username)) {
            // Can't find user.
            throw new MzkRuntimeException("No user given.", UserNotificationEnum.NO_USERNAME_ERROR);
        }
        // Getting the user for the database.
        final Optional<MzkUser> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            LOG.warn("The unknown user {} tried to connect.", username);
            throw new MzkRuntimeException("An unknow user tryed to connect", UserNotificationEnum.USER_AUTH_ERROR);
        }
        // If the user is not active he can't connect
        if (Boolean.FALSE.equals(user.get().getIsActive())) {
            LOG.warn("The disabled user {} tried to connect.", username);
            throw new MzkRuntimeException("An disabled user tried to connect to the database.",
                    UserNotificationEnum.DISABLED_USER_ERROR);
        }
        // Adding rights
        final List<MzkGrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (final Privilege privilege : userService.getPrivilegeByUsername(username)) {
            // Adding the roles of the user into the object.
            grantedAuthorities.add(new MzkGrantedAuthority(privilege));
        }
        // Wrapper for the user for spring security.
        return new MzkUserDetail(user.get(), grantedAuthorities);
    }
}
