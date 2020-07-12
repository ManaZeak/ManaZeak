package org.manazeak.manazeak.service.security.invite;

import org.manazeak.manazeak.entity.security.MzkUser;

/**
 * This interface handles the invite codes of the application.
 */
public interface InviteCodeService {

    /**
     * Check if the invitation code is correct.
     *
     * @param inviteCodeValue The invite code provided by the user.
     * @return true if the invitation code is correct, false otherwise.
     */
    boolean checkInviteCode(String inviteCodeValue);

    /**
     * Invalidate the invite code used by the user, generate a new invite code.
     *
     * @param inviteCodeValue The value of the invite code.
     * @param newUser         The user that was created.
     */
    void useInviteCode(String inviteCodeValue, MzkUser newUser);

    /**
     * Generate a new invite code for a user.
     *
     * @param user The user that need a new invite code.
     */
    void generateInviteCode(MzkUser user);

}
