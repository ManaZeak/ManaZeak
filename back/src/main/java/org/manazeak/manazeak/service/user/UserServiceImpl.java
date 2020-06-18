package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.PrivilegeDAO;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Privilege;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This service is used get user in the database.
 */
@Service
@TransactionnalWithRollback
public class UserServiceImpl implements UserService {

    private final MzkUserDAO mzkUserDAO;

    private final PrivilegeDAO privilegeDAO;

    public UserServiceImpl(PrivilegeDAO privilegeDAO, MzkUserDAO mzkUserDAO) {
        this.privilegeDAO = privilegeDAO;
        this.mzkUserDAO = mzkUserDAO;
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
    public List<Privilege> getPrivilegeByUsername(String username) {
        return privilegeDAO.getPrivilegesByUsername(username);
    }
}
