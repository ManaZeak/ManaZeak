package org.manazeak.manazeak.service.security.invite;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.datacreation.security.invite.InviteCodeConstants;
import org.manazeak.manazeak.datacreation.security.invite.InviteCodeDataCreation;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;

import java.util.Optional;

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
        // Create an invite code into the database.
        inviteCodeDataCreation.createInviteCode();
        // The invite code should be valid.
        Assertions.assertTrue(inviteCodeService.checkInviteCode(InviteCodeConstants.VALUE),
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
}
