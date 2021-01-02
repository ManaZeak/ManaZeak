package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.PrivilegeDAO;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.manager.security.invitecode.InviteCodeManager;
import org.manazeak.manazeak.manager.security.user.AdminUserManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This service is used get user in the database.
 */
@Service
@TransactionnalWithRollback
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);
    /**
     * The DAO for the privileges of the users.
     */
    private final PrivilegeDAO privilegeDAO;
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

    public UserServiceImpl(PrivilegeDAO privilegeDAO, UserManager userManager, AdminUserManager adminUserManager,
                           InviteCodeManager inviteCodeManager) {
        this.privilegeDAO = privilegeDAO;
        this.userManager = userManager;
        this.adminUserManager = adminUserManager;
        this.inviteCodeManager = inviteCodeManager;
    }

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
        LOG.info("Creating the user {}", userToCreate.getUsername());
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
}
