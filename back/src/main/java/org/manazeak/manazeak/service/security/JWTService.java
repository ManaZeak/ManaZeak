package org.manazeak.manazeak.service.security;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * Handles the JWT in the application.
 */
@Service
@RequiredArgsConstructor
public class JWTService {

    /**
     * The number of seconds before the token expire. In this case, 14 days.
     */
    private static final long TOKEN_EXPIRY = 1209600L;

    private final MzkUserDAO userDAO;

    private final JwtEncoder encoder;

    private final UserManager userManager;

    private final PasswordEncoder passwordEncoder;


    /**
     * Create a JWT token for the user provided.
     * Check if the user can log in the application with the given logs.
     *
     * @param username The username.
     * @param password The password of the user to check.
     * @return The JWT token for the user.
     */
    public String createJwtToken(@NonNull String username, @NonNull String password) {
        // Getting the user from the database.
        MzkUser user = userDAO.getByUsername(username)
                .orElseThrow(
                        () -> MzkRestException.error("user.login.error.title", "user.login.error.message")
                );

        // Checking if the passwords match.
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw MzkRestException.error("user.login.error.title", "user.login.error.message");
        }

        return buildJwt(user);
    }

    /**
     * Get the current connected user and recreate a token for him.
     *
     * @return The new token.
     */
    public String renewToken() {
        // Getting the current user from the session.
        MzkUser currentUser = userManager.getCurrentUser();

        // Creating the JWT for this user.
        return buildJwt(currentUser);
    }

    /**
     * Create a JWT token for the given user passed in parameter.
     *
     * @param user The user associated with this JWT.
     * @return The JWT to send to the front.
     */
    private String buildJwt(@NonNull MzkUser user) {
        // All the checks are ok, building the token with the user information.
        // Adding rights
        final Set<String> grantedAuthorities = new HashSet<>();
        for (final Privilege privilege : userManager.getPrivilegeByUsername(user.getUsername())) {
            // Adding the roles of the user into the object.
            grantedAuthorities.add(privilege.getCodePrivilege());
        }

        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(TOKEN_EXPIRY))
                .subject(user.getUsername())
                .claim("scope", grantedAuthorities)
                // Setting this flag for the front to display the additional register page.
                .claim("register-wip", !user.getIsComplete()).build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}
