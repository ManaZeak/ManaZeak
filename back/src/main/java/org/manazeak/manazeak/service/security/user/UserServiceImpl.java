package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.PrivilegeDAO;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.manazeak.manazeak.service.security.invite.InviteCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final InviteCodeService inviteCodeService;

    public UserServiceImpl(PrivilegeDAO privilegeDAO, UserManager userManager, InviteCodeService inviteCodeService) {
        this.privilegeDAO = privilegeDAO;
        this.userManager = userManager;
        this.inviteCodeService = inviteCodeService;
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
        inviteCodeService.generateInviteCode(user);
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Privilege> getPrivilegeByUsername(String username) {
        return privilegeDAO.getPrivilegesByUsername(username);
    }
}
