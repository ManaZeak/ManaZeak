package org.manazeak.manazeak.configuration.security;

import org.manazeak.manazeak.constant.security.PrivilegeInterface;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;

/**
 * This class contains some useful methods for testing the privileges of a user.
 */
public final class SecurityUtil {

    private SecurityUtil() {

    }

    /**
     * Check if the user has the privilege to do this action.
     *
     * @param privilege the privilege that is required.
     * @return true if the user has the privilege, false otherwise.
     */
    public static boolean currentUserHasPrivilege(PrivilegeInterface privilege) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         // If the user is not authenticated, we don't check.
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            if (authentication == null) {
                return false;
            }
            // Get the list of privileges contained in the JWT.
            // This data cannot be tempered, since it is signed.
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            // Checking if the privilege is present.
            for (GrantedAuthority authority : authorities) {
                if (authority.getAuthority() != null && authority.getAuthority().equals("SCOPE_" + privilege.name())) {
                    // The privilege is present.
                    return true;
                }
            }
        }

        // No privilege found.
        return false;
    }
}
