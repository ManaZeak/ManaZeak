package org.manazeak.manazeak.service.security.user;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.PrivilegeDAO;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.manager.security.invitecode.InviteCodeManager;
import org.manazeak.manazeak.manager.security.user.AdminUserManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * This service is used get user in the database.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private static final long TOKEN_EXPIRY = 86400L;
    /**
     * The DAO for the privileges of the users.
     */
    private final PrivilegeDAO privilegeDAO;
    private final PasswordEncoder passwordEncoder;
    private final MzkUserDAO userDAO;
    private final JwtEncoder encoder;
    /**
     * The user manipulator object.
     */
    private final UserManager userManager;
    /**
     * Used to manipulate the user for admin actions.
     */
    private final AdminUserManager adminUserManager;
    /**
     * Object used to manipulate the invite codes.
     */
    private final InviteCodeManager inviteCodeManager;


    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<MzkUser> findByUsername(String username) {
        return userManager.findByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUser createUser(NewUserDto userToCreate) {
        log.info("Creating the user {}", userToCreate.getUsername());
        // Creating the user.
        MzkUser user = userManager.insertUser(userToCreate);
        // Creating the invite code of the user.
        inviteCodeManager.generateInviteCode(user);
        // Invalidating the parent invite code.
        inviteCodeManager.useInviteCode(userToCreate.getInviteCode(), user);
        return user;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Privilege> getPrivilegeByUsername(String username) {
        return privilegeDAO.getPrivilegesByUsername(username);
    }

    @Override
    public void changeUserPassword(ResetPasswordDto newPassword, MzkUser user) {
        userManager.changeCurrentUserPassword(newPassword, user);
    }

    @Override
    public void changeUserPassword(ResetUserPasswordDto resetUserPassword) {
        userManager.changeUserPassword(resetUserPassword);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isUserConnected() {
        // If the user is not anonymous, then he is connected.
        return !(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserHierarchyDto getUserHierarchy() {
        // Getting the user hierarchy.
        return adminUserManager.getUserHierarchy();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UserListLineDto> getUserList() {
        return adminUserManager.getUserList();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteUser(Long userId) {
        adminUserManager.deleteUserById(userId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deactivateUser(Long userId) {
        adminUserManager.deactivateUserById(userId);
    }

    @Override
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

        // All the checks are ok, building the token with the user information.
        // Adding rights
        final Set<String> grantedAuthorities = new HashSet<>();
        for (final Privilege privilege : getPrivilegeByUsername(user.getUsername())) {
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
