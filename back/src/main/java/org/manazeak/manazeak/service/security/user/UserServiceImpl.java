package org.manazeak.manazeak.service.security.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.manager.security.invitecode.InviteCodeManager;
import org.manazeak.manazeak.manager.security.user.AdminUserManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This service is used get user in the database.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

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
}
