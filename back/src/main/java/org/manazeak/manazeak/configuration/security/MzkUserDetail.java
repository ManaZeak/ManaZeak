package org.manazeak.manazeak.configuration.security;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.security.core.userdetails.User;

import java.util.List;

/**
 * The class wrapper for the User.
 */
public class MzkUserDetail extends User {

    private final MzkUser user;

    public MzkUserDetail(final MzkUser user, final List<MzkGrantedAuthority> privileges) {
        super(user.getUsername(), user.getPassword(), true, true, true, true,
                privileges);
        this.user = user;
    }

    /**
     * @return the utilisateur
     */
    public MzkUser getUser() {
        return user;
    }


}
