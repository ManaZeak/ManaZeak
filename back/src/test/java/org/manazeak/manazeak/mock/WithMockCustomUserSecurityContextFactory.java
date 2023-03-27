package org.manazeak.manazeak.mock;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.MzkGrantedAuthority;
import org.manazeak.manazeak.configuration.security.MzkUserDetail;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class WithMockCustomUserSecurityContextFactory implements WithSecurityContextFactory<WithMockMzkUser> {

    private final MzkUserDataCreation userDataCreation;

    private final UserService userService;


    @Override
    public SecurityContext createSecurityContext(WithMockMzkUser annotation) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        MzkUser user = userDataCreation.createUserForUnitTest(annotation);


        final List<MzkGrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (final Privilege privilege : userService.getPrivilegeByUsername(annotation.username())) {
            // Adding the roles of the user into the object.
            grantedAuthorities.add(new MzkGrantedAuthority(privilege));
        }

        MzkUserDetail userDetail = new MzkUserDetail(user, grantedAuthorities);

        Authentication auth = new UsernamePasswordAuthenticationToken(userDetail, "pw", grantedAuthorities);
        context.setAuthentication(auth);

        return context;
    }
}
