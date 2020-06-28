package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.PrivilegeDAO;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
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
    private final MzkUserDAO mzkUserDAO;
    private final PrivilegeDAO privilegeDAO;
    private final UserManager userManager;

    public UserServiceImpl(PrivilegeDAO privilegeDAO, MzkUserDAO mzkUserDAO, UserManager userManager) {
        this.privilegeDAO = privilegeDAO;
        this.mzkUserDAO = mzkUserDAO;
        this.userManager = userManager;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<MzkUser> findByUsername(String username) {
        return mzkUserDAO.getByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUser createUser(NewUserDto userToCreate) {
        LOG.info("Creating the user {}", userToCreate.getUsername());
        userManager.insertUser(userToCreate);
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
