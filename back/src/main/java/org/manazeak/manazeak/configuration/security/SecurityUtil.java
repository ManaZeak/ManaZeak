package org.manazeak.manazeak.configuration.security;

import org.manazeak.manazeak.constant.security.PrivilegeInterface;
import org.manazeak.manazeak.util.CastUtil;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

/**
 * This class contains some useful methods for testing the privileges of a user.
 */
public class SecurityUtil {

    /**
     * Check if the user has the privilege to do this action.
     * @param privilege the privilege that is required.
     * @return true if the user has the privilege, false otherwise.
     */
    public static boolean currentUserHasPrivilege(PrivilegeInterface privilege) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // If the user is not authenticated we don't check.
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            // Get the list of privileges
            List<MzkGrantedAuthority> authorities = CastUtil.castList(MzkGrantedAuthority.class, authentication.getAuthorities());
            // Checking if the privilege is present.
            for (MzkGrantedAuthority authority : authorities) {
                if (authority.getAuthority().equals(privilege.name())) {
                    // The privilege is present.
                    return true;
                }
            }
        }

        // No privilege found.
        return false;
    }
}
