package org.manazeak.manazeak.service.security.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.user.ResetPasswordDataCreation;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRestException;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * Test the functions for changing the user password.
 */
class ResetUserPasswordServiceTest extends AbstractManaZeakTest {

    @Autowired
    private MzkUserDataCreation mzkUserDataCreation;

    @Autowired
    private ResetPasswordDataCreation resetUserPasswordDataCreation;

    @Autowired
    private UserTestHelper userTestHelper;

    @Autowired
    private UserManager userManager;

    /**
     * Test the change password function.
     */
    @Test
    void testResetUserPassword() throws MzkRestException {
        // Creating a user in the database.
        MzkUser testUser = mzkUserDataCreation.createDefaultMzkUser();
        // Flush the JPA to force the insert of the new user in the database.
        cleanJpa();
        // Resetting the user password.
        userManager.changeUserPassword(resetUserPasswordDataCreation.createResetUserPasswordDto(testUser.getUserId()));
        // Flush the JPA to force the insert of the new user in the database.
        cleanJpa();
        testUser = userTestHelper.getDefaultUser();
        UserVerificationHelper.testDefaultUserChangePassword(testUser);
    }

    /**
     * Test the change password function when the user doesn't exist.
     */
    @Test
    void testResetNonExistingUserPassword() {
        try {
            userManager.changeUserPassword(resetUserPasswordDataCreation.createNonExistingResetUserPasswordDto());
        } catch (MzkRestException e) {
            return;
        }
        Assertions.fail("The function should have encountered an error.");
    }
}
