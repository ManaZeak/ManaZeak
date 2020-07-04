package org.manazeak.manazeak.service.user;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.datacreation.user.UserTestConstants;
import org.manazeak.manazeak.entity.security.MzkUser;

public final class UserVerificationHelper {

    private UserVerificationHelper() {

    }

    /**
     * Test that a user has all the default values.
     * @param user the user to test.
     */
    public static void testDefaultUserValues(MzkUser user, boolean encodedPass) {
        Assertions.assertEquals(UserTestConstants.USERNAME, user.getUsername(), "The username didn't match.");
        Assertions.assertEquals(UserTestConstants.MAIL, user.getMail(), "The email field didn't match.");
        if(!encodedPass) {
            Assertions.assertEquals(UserTestConstants.PASSWORD, user.getPassword(), "The password didn't match.");
        } else {
            Assertions.assertNotEquals(UserTestConstants.PASSWORD, user.getPassword(), "The password hasn't been encrypted.");
        }
    }

    /**
     * Test that a user has all default values and has changed his password.
     * @param user the user to test.
     */
    public static void testDefaultUserChangePassword(MzkUser user) {
        Assertions.assertEquals(UserTestConstants.USERNAME, user.getUsername(), "The username didn't match.");
        Assertions.assertEquals(UserTestConstants.MAIL, user.getMail(), "The email field didn't match.");
        Assertions.assertNotEquals(UserTestConstants.PASSWORD, user.getPassword(), "The password hasn't been changed.");
        Assertions.assertNotEquals(UserTestConstants.NEW_PASS, user.getPassword(), "The password hasn't been encrypted.");
    }
}
