package org.manazeak.manazeak.configuration.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.notification.user.UserNotificationEnum;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.manazeak.manazeak.service.security.user.UserService;
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
@Slf4j
@RequiredArgsConstructor
public class MzkUserDetailServiceImpl implements UserDetailsService {

    private final UserService userService;
    private final UserManager userManager;

    @Override
    public UserDetails loadUserByUsername(String username) {
        if (username == null || username.isEmpty()) {
            // Can't find user.
            throw new MzkRuntimeException("No user given.", UserNotificationEnum.NO_USERNAME_ERROR);
        }
        // Getting the user for the database.
        final Optional<MzkUser> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            log.warn("The unknown user {} tried to connect.", username);
            throw new MzkRuntimeException("An unknow user tryed to connect", UserNotificationEnum.USER_AUTH_ERROR);
        }
        // If the user is not active he can't connect
        if (Boolean.FALSE.equals(user.get().getIsActive())) {
            log.warn("The disabled user {} tried to connect.", username);
            throw new MzkRuntimeException("An disabled user tried to connect to the database.",
                    UserNotificationEnum.DISABLED_USER_ERROR);
        }
        // Adding rights
        final List<MzkGrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (final Privilege privilege : userManager.getPrivilegeByUsername(username)) {
            // Adding the roles of the user into the object.
            grantedAuthorities.add(new MzkGrantedAuthority(privilege));
        }
        // Wrapper for the user for spring security.
        return new MzkUserDetail(user.get(), grantedAuthorities);
    }
}
