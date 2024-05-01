package org.manazeak.manazeak.controller.rest.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.user.UserLoginDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * This class handles the login of a user.
 */
@RestController
@RequiredArgsConstructor
public class LoginControllerRest {

    private static final long TOKEN_EXPIRY = 86400L;
    private final PasswordEncoder passwordEncoder;
    private final MzkUserDAO userDAO;
    private final UserService userService;
    private final JwtEncoder encoder;

    @GetMapping("/test/")
    public String test() {
        return "test";
    }

    /**
     * Create a JWT token for the user.
     *
     * @return The token if the user exists in the database.
     */
    @PostMapping("/login/")
    public String getToken(@RequestBody @Valid UserLoginDto loginInfo) {
        // Getting the user from the database.
        MzkUser user = userDAO.getByUsername(loginInfo.getUsername())
                .orElseThrow(
                        () -> MzkRestException.error("user.login.error.fail", "user.login.error.fail")
                );

        // Checking if the passwords match.
        if (!passwordEncoder.matches(loginInfo.getPassword(), user.getPassword())) {
            throw MzkRestException.error("user.login.error.fail", "user.login.error.fail");
        }

        // All the checks are ok, building the token with the user information.
        // Adding rights
        final Set<String> grantedAuthorities = new HashSet<>();
        for (final Privilege privilege : userService.getPrivilegeByUsername(user.getUsername())) {
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
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}
