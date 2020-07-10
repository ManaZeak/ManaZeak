package org.manazeak.manazeak.service.security.user;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.datacreation.user.UserTestConstants;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Helper used for manipulating the users in the tests.
 */
@Component
public class UserTestHelper {

    @Autowired
    UserService userService;

    /**
     * Get the default user from the database.
     *
     * @return the default user.
     */
    public MzkUser getDefaultUser() {
        // Getting the user with service
        Optional<MzkUser> optUserTest = userService.findByUsername(UserTestConstants.USERNAME);
        // Checking if there is a user present.
        Assertions.assertTrue(optUserTest.isPresent(), "The user wasn't found.");
        return optUserTest.get();
    }
}
