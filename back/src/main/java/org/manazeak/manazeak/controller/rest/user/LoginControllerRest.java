package org.manazeak.manazeak.controller.rest.user;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.exception.MzkSecurityException;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * This class handles the login of a user.
 */
@RestController
@RequiredArgsConstructor
public class LoginControllerRest {

    private final PasswordEncoder passwordEncoder;

    private final MzkUserDAO userDAO;

    private final UserService userService;

    private final JwtEncoder encoder;

    @GetMapping("/test/")
    public String test() {
        return "test";
    }

    // FIXME : remove this.
    /**
     * Get the user token.
     *
     * @return The token needed by the user to authenticate in the application.
     */
    @GetMapping("/token/")
    public String getUserToken() {
        Instant now = Instant.now();
        long expiry = 36000L;
        String username = "JESUS";
        String encodedPass = passwordEncoder.encode("JESUS");

        Optional<MzkUser> user = userDAO.getByUsername(username);
        user.orElseThrow(() -> new MzkSecurityException("aze", "aze"));
        passwordEncoder.matches("JESUS", user.get().getPassword());

        // Adding rights
        final Set<String> grantedAuthorities = new HashSet<>();
        for (final Privilege privilege : userService.getPrivilegeByUsername(username)) {
            // Adding the roles of the user into the object.
            grantedAuthorities.add(privilege.getCodePrivilege());
        }


        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(username)
                .claim("scope", grantedAuthorities)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}
