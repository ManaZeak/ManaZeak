package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.constant.security.RoleEnum;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.RoleDAO;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Role;
import org.manazeak.manazeak.util.DateUtil;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@TransactionnalWithRollback
public class UserManagerImpl implements UserManager {

    /**
     * Used to manipulate the roles in the database.
     */
    private final RoleDAO roleDAO;
    /**
     * Used to manipulate the user in the database.
     */
    private final MzkUserDAO userDAO;
    /**
     * The Service to encode the password.
     */
    private final PasswordEncoder passEncoder;

    public UserManagerImpl(RoleDAO roleDAO, @Lazy PasswordEncoder passEncoder, MzkUserDAO userDAO) {
        this.roleDAO = roleDAO;
        this.passEncoder = passEncoder;
        this.userDAO = userDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MzkUser insertUser(NewUserDto newUser) {
        // Getting the default role for a new user.
        Role defaultRole = roleDAO.getRoleByRoleId(RoleEnum.USER.getId());
        // Creating the user to insert.
        MzkUser user = loadMzkUserFromNewUser(newUser);
        user.setRole(defaultRole);
        user.setIsActive(true);
        // Saving the user in the database.
        userDAO.save(user);
        return user;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void changeCurrentUserPassword(ResetPasswordDto newPasswords) {
        // Checking witch user has to be modified.

    }

    public MzkUser loadMzkUserFromNewUser(NewUserDto newUser) {
        MzkUser user = new MzkUser();
        user.setUsername(newUser.getUsername());
        user.setPassword(passEncoder.encode(newUser.getPassword1()));
        user.setBio(newUser.getBio());
        user.setLocale(newUser.getLocale());
        user.setBirthDate(DateUtil.parseString(newUser.getBirthDate(), DateUtil.FR_DATE_FORMATTER));
        // TODO: add country.
        user.setMail(newUser.getMail());
        user.setSurname(newUser.getSurname());
        user.setName(newUser.getName());
        return user;
    }
}
