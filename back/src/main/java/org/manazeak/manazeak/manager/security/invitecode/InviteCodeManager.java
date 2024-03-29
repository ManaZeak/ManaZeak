package org.manazeak.manazeak.manager.security.invitecode;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.notification.user.UserNotificationEnum;
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
@RequiredArgsConstructor
public class InviteCodeManager {

    private final InviteCodeDAO inviteCodeDAO;
    private final MzkUserDAO userDAO;

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
            throw new MzkRuntimeException("The invite code : " + inviteCodeValue + "wasn't found",
                    UserNotificationEnum.INVITE_CODE_NOT_FOUND);
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
        generateInviteCode(inviteCode.getParent());
    }

    /**
     * Allows to change all the invite codes of a user to another user. Used to delete a user.
     *
     * @param user     the user that will be deleted.
     * @param newOwner The user that will gain the new invite codes.
     */
    public void changeUserInviteCodeOwner(MzkUser user, MzkUser newOwner) {
        // Deleting the active invite code of the user to avoid 2 active invite codes.
        inviteCodeDAO.deleteInviteCodeByParentAndIsActive(user, true);
        // Changing the parent of the invite code.
        inviteCodeDAO.updateParentByUserId(user, newOwner);
    }

    /**
     * Delete an invite code in the database.
     *
     * @param inviteCode The invite code to delete.
     */
    public void deleteInviteCode(InviteCode inviteCode) {
        inviteCodeDAO.delete(inviteCode);
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
        inviteCode.setParent(user);
        // Saving the invite code into the database.
        inviteCodeDAO.save(inviteCode);
    }
}
