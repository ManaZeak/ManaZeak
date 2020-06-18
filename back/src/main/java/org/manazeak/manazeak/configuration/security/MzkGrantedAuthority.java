package org.manazeak.manazeak.configuration.security;

import org.manazeak.manazeak.entity.security.Privilege;
import org.springframework.security.core.GrantedAuthority;

public class MzkGrantedAuthority implements GrantedAuthority {

    /**
     * Privilege in base.
     */
    private final String authorityName;

    /**
     * Creates an authority from a Privilege. Prefixing with PRI_ for privilege.
     *
     * @param privilege The privilege used to create the authority.
     */
    public MzkGrantedAuthority(Privilege privilege) {
        authorityName = "PRI_" + privilege.getCodePrivilege();
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
