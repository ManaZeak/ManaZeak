package org.manazeak.manazeak.service.security.invite;

import org.manazeak.manazeak.exception.MzkValidationException;

/**
 * This interface handles the invite codes of the application.
 */
public interface InviteCodeService {

    /**
     * Check if the invitation code is correct.
     *
     * @param inviteCodeValue The invite code provided by the user.
     */
    void checkInviteCode(String inviteCodeValue) throws MzkValidationException;
}
