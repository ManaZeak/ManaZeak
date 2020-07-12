package org.manazeak.manazeak.configuration.security;

import org.manazeak.manazeak.entity.security.Privilege;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public class MzkGrantedAuthority implements GrantedAuthority {

    /**
     * Privilege in base.
     */
    private final String authorityName;

    /**
     * Creates an authority from a Privilege.
     *
     * @param privilege The privilege used to create the authority.
     */
    public MzkGrantedAuthority(Privilege privilege) {
        authorityName = privilege.getCodePrivilege();
    }

    /**
     * Get the authority.
     *
     * @return The authoprity name.
     */
    @Override
    public String getAuthority() {
        return authorityName;
    }
}
