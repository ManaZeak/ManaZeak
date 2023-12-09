package org.manazeak.manazeak.configuration.security;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.security.core.userdetails.User;

import java.util.List;

/**
 * The class wrapper for the User.
 */
@EqualsAndHashCode(callSuper = true)
@Getter
public class MzkUserDetail extends User {

    private final MzkUser user;

    public MzkUserDetail(final MzkUser user, final List<MzkGrantedAuthority> privileges) {
        super(user.getUsername(), user.getPassword(), user.getIsActive(), true, true, true,
                privileges);
        this.user = user;
    }

}
