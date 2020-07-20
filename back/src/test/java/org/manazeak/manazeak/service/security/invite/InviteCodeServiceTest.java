package org.manazeak.manazeak.service.security.invite;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.datacreation.security.invite.InviteCodeConstants;
import org.manazeak.manazeak.datacreation.security.invite.InviteCodeDataCreation;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.Set;

/**
 * This class test the manipulation of invite codes in the application.
 */
class InviteCodeServiceTest extends AbstractManaZeakTest {

    @Autowired
    InviteCodeService inviteCodeService;
    @Autowired
    InviteCodeDataCreation inviteCodeDataCreation;
    @Autowired
    MzkUserDataCreation userDataCreation;
    @Autowired
    MzkUserDAO userDAO;

    /**
     * Checking that an active invite code is valid.
     */
    @Test
    void checkInviteCode() {
        // Using the invite code of the admin in the database.
        // The invite code should be valid.
        Assertions.assertTrue(inviteCodeService.checkInviteCode(UserTestConstants.INVITE_CODE),
                "The invite code should be valid.");
    }

    /**
     * Checking that a non active invite code isn't valid.
     */
    @Test
    void checkInviteCodeDisable() {
        // Create an invite code into the database.
        inviteCodeDataCreation.createDeactivatedInviteCode();
        // The invite code should be valid.
        Assertions.assertFalse(inviteCodeService.checkInviteCode(InviteCodeConstants.VALUE),
                "The invite code should not be valid.");
    }

    /**
     * Check that the invite code is invalidated correctly and associated to the user and a new one is generated.
     */
    @Test
    void testUseValidInviteCode() {
        // Creating a user.
        MzkUser user = userDataCreation.createDefaultMzkUser();
        // Using the default invite code.
        inviteCodeService.useInviteCode(UserTestConstants.INVITE_CODE, user);
        // Cleaning the JPA to avoid any cache issue
        cleanJpa();
        // Checking if the new user has an invite code
        Assertions.assertNotNull(user.getInviteCode(), "The new user does't have an associated invite code.");
        // Checking if the invite code of the parent has been invalidated.
        Assertions.assertFalse(inviteCodeService.checkInviteCode(InviteCodeConstants.VALUE), "The invite code of the parent should not be valid.");
        // Checking if the parent has another invite code.
        Optional<MzkUser> userOpt = userDAO.getByUsername(UserTestConstants.ADMIN_USERNAME);
        Assertions.assertTrue(userOpt.isPresent(), "The parent user cannot be found.");
        Assertions.assertEquals(2, userOpt.get().getInviteCodeList().size(), "No other invite code has been generated.");
    }

    /**
     * Check that the invite code depth limit is working.
     */
    @Test
    void testDepthLimit() {
        // Creating a chain of users and getting the deepest.
        MzkUser user = userDataCreation.createMultipleMzkUser(3);
        // The invite code of this user shouldn't be valid
        Set<InviteCode> inviteCodes = user.getInviteCodeList();
        Assertions.assertEquals(1, inviteCodes.size(), "There is more invite code than expected.");
        for (InviteCode invite : inviteCodes) {
            Assertions.assertFalse(inviteCodeService.checkInviteCode(invite.getValue()), "The invite code shouldn't be correct.");
        }
    }
}
