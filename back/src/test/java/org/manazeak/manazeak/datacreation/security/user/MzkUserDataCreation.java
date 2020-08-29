package org.manazeak.manazeak.datacreation.security.user;

import org.manazeak.manazeak.constant.security.RoleEnum;
import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.daos.security.RoleDAO;
import org.manazeak.manazeak.datacreation.security.invite.InviteCodeDataCreation;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * This class allows to create data for the unit tests.
 */
@Component
public class MzkUserDataCreation {

    private final UserService userService;

    private final MzkUserDAO mzkUserDAO;

    private final InviteCodeDataCreation inviteCodeDataCreation;

    private final InviteCodeDAO inviteCodeDAO;

    private final RoleDAO roleDAO;

    public MzkUserDataCreation(UserService userService, InviteCodeDataCreation inviteCodeDataCreation,
                               InviteCodeDAO inviteCodeDAO, MzkUserDAO mzkUserDAO, RoleDAO roleDAO) {
        this.userService = userService;
        this.inviteCodeDataCreation = inviteCodeDataCreation;
        this.mzkUserDAO = mzkUserDAO;
        this.roleDAO = roleDAO;
        this.inviteCodeDAO = inviteCodeDAO;
    }

    /**
     * Creates a default user in the database.
     *
     * @return the user that was created.
     */
    public MzkUser createDefaultMzkUser() {
        MzkUser user = new MzkUser();
        user.setUsername(UserTestConstants.USERNAME);
        user.setPassword(UserTestConstants.PASSWORD);
        user.setMail(UserTestConstants.MAIL);
        user.setRole(roleDAO.getRoleByRoleId(RoleEnum.USER.getId()));
        user.setIsActive(true);
        user.setIsComplete(true);
        mzkUserDAO.save(user);
        return user;
    }

    /**
     * Create multiple users that are parent of each.
     *
     * @return the last user created.
     */
    public MzkUser createMultipleMzkUser(int userToCreate) {
        int suffix = 0;
        InviteCode parentInviteCode = inviteCodeDAO.getInviteCodeByValueAndIsActiveTrue(UserTestConstants.INVITE_CODE).get();
        // Creating users with suffixes.
        for (int i = 0; i < userToCreate; ++i) {
            suffix++;
            MzkUser user = new MzkUser();
            user.setUsername(UserTestConstants.USERNAME + suffix);
            user.setPassword(UserTestConstants.PASSWORD);
            user.setRole(roleDAO.getRoleByRoleId(RoleEnum.USER.getId()));
            user.setIsActive(true);
            user.setIsComplete(true);
            // Linking the user with it's parent.
            user.setInviteCode(parentInviteCode);
            // Create an invite code for him
            parentInviteCode = inviteCodeDataCreation.createInviteCode(String.valueOf(suffix));
            user.addInviteCode(parentInviteCode);
            mzkUserDAO.save(user);
        }
        // Getting the last created user.
        Optional<MzkUser> user = userService.findByUsername(UserTestConstants.USERNAME + suffix);
        if (user.isEmpty()) {
            throw new MzkRuntimeException("The user " + UserTestConstants.USERNAME + suffix + " doesn't exist.");
        }
        return user.get();
    }
}
