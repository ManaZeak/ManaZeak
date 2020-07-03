package org.manazeak.manazeak.datacreation.user;

import org.manazeak.manazeak.constant.security.RoleEnum;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.RoleDAO;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.user.UserService;
import org.springframework.stereotype.Component;

/**
 * This class allows to create data for the unit tests.
 */
@Component
public class MzkUserDataCreation {

    /** The username of the default user. */
    public static String USERNAME = "test_user";
    public static String PASSWORD = "pass";
    public static String MAIL = "test@test.test";

    private final UserService userService;

    private final MzkUserDAO mzkUserDAO;

    private final RoleDAO roleDAO;

    public MzkUserDataCreation(UserService userService, MzkUserDAO mzkUserDAO, RoleDAO roleDAO) {
        this.userService = userService;
        this.mzkUserDAO = mzkUserDAO;
        this.roleDAO = roleDAO;
    }

    /**
     * Creates a default user in the database.
     * @return the user that was created.
     */
    public MzkUser createDefaultMzkUser() {
        MzkUser user = new MzkUser();
        user.setUsername(USERNAME);
        user.setPassword(PASSWORD);
        user.setMail(MAIL);
        user.setRole(roleDAO.getRoleByRoleId(RoleEnum.USER.getId()));
        user.setIsActive(true);
        mzkUserDAO.save(user);
        return user;
    }
}
