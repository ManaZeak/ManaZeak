package org.manazeak.manazeak.configuration.security;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
            throw new MzkRuntimeException("No username given.");
        }
        // Getting the user for the database.
        final Optional<MzkUser> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            LOG.warn("The unknown user {} tried to connect.", username);
            throw new MzkRuntimeException("Authentication error");
        }
        // Adding rights
        final List<MzkGrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (final Privilege privilege : userService.getPrivilegeByUsername(username)) {
            // Adding the roles of the user into the object.
            grantedAuthorities.add(new MzkGrantedAuthority(privilege));
        }
        // Wrap l'utilisateur dans le UserDetails pour spring security
        return new MzkUserDetail(user.get(), grantedAuthorities);
    }
}
