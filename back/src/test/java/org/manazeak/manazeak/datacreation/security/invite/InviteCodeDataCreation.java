package org.manazeak.manazeak.datacreation.security.invite;

import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.springframework.stereotype.Component;

/**
 * This class allows to create data for the unit test.
 */
@Component
public class InviteCodeDataCreation {

    public InviteCodeDAO inviteCodeDAO;

    public InviteCodeDataCreation(InviteCodeDAO inviteCodeDAO) {
        this.inviteCodeDAO = inviteCodeDAO;
    }

    /**
     * Insert an invite code in the database.
     *
     * @param suffix Optional param insert the suffix after the default invite code.
     */
    public InviteCode createInviteCode(String suffix) {
        InviteCode inviteCode = new InviteCode();
        inviteCode.setIsActive(true);
        if (suffix != null) {
            inviteCode.setValue(InviteCodeConstants.VALUE + suffix);
        } else {
            inviteCode.setValue(InviteCodeConstants.VALUE);
        }
        inviteCodeDAO.save(inviteCode);
        return inviteCode;
    }

    /**
     * Insert an invite code in the database.
     */
    public void createDeactivatedInviteCode() {
        InviteCode inviteCode = new InviteCode();
        inviteCode.setIsActive(false);
        inviteCode.setValue(InviteCodeConstants.VALUE);
        inviteCodeDAO.save(inviteCode);
    }
}
