package org.manazeak.manazeak.manager.security.invitecode;

import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.DateUtil;
import org.manazeak.manazeak.util.HashUtil;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Manages the invites codes for the users.
 */
@Component
public class InviteCodeManager {

    private final InviteCodeDAO inviteCodeDAO;
    private final MzkUserDAO userDAO;

    public InviteCodeManager(InviteCodeDAO inviteCodeDAO, MzkUserDAO userDAO) {
        this.inviteCodeDAO = inviteCodeDAO;
        this.userDAO = userDAO;
    }

    /**
     * Invalidate the invite code used by the user, generate a new invite code.
     *
     * @param inviteCodeValue The value of the invite code.
     * @param newUser         The user that was created.
     */
    public void useInviteCode(String inviteCodeValue, MzkUser newUser) {
        // Get the invite code from the database.
        Optional<InviteCode> inviteCodeOpt = inviteCodeDAO.getInviteCodeByValueAndIsActiveTrue(inviteCodeValue);
        if (inviteCodeOpt.isEmpty()) {
            throw new MzkRuntimeException("The invite code wasn't found in the database.");
        }
        // Mark the invite code as used.
        InviteCode inviteCode = inviteCodeOpt.get();
        inviteCode.setIsActive(false);
        // Saving the invite code in the database.
        inviteCodeDAO.save(inviteCode);
        // Setting the used invite code on the new user.
        newUser.setInviteCode(inviteCode);
        userDAO.save(newUser);
        // Generating a new invite code for the parent.
        generateInviteCode(userDAO.getMzkUserByInviteCodeListContains(inviteCode));
    }

    /**
     * Generate a new invite code for a user.
     *
     * @param user The user that need a new invite code.
     */
    public void generateInviteCode(MzkUser user) {
        // Generating the object that will be hashed.
        StringBuilder inviteSeed = new StringBuilder();
        inviteSeed.append(user.getUsername());
        inviteSeed.append(DateUtil.formatDateTime(LocalDateTime.now(), DateUtil.FULL_TIME_FORMATTER));
        // Generating the invite code object.
        InviteCode inviteCode = new InviteCode();
        inviteCode.setIsActive(true);
        inviteCode.setValue(HashUtil.getMd5Hash(inviteSeed));
        // Saving the invite code into the database.
        inviteCodeDAO.save(inviteCode);
        // Linking the invite code to the user.
        user.addInviteCode(inviteCode);
        userDAO.save(user);
    }
}
