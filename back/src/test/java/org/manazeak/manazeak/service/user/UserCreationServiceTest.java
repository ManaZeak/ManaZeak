package org.manazeak.manazeak.service.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.user.NewUserDataCreation;
import org.manazeak.manazeak.datacreation.user.UserTestConstants;
import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * This class test the user creation system.
 */
class UserCreationServiceTest extends AbstractManaZeakTest {

    @Autowired
    private MzkUserDataCreation mzkUserDataCreation;

    @Autowired
    private NewUserDataCreation newUserDataCreation;

    @Autowired
    UserTestHelper userTestHelper;

    @Autowired
    private UserService userService;

    /**
     * Test the login getter works properly.
     */
    @Test
    void findByLoginTest() {
        // Creating a user in th database.
        mzkUserDataCreation.createDefaultMzkUser();
        // Cleaning the JPA to have only DB results.
        cleanJpa();
        // Checking if the data is the same.
        UserVerificationHelper.testDefaultUserValues(userTestHelper.getDefaultUser(), false);
    }

    /**
     * Test that the user creation work properly.
     */
    @Test
    void createUserTest() {
        // Creating the test object.
        NewUserDto newUser = newUserDataCreation.createNewUserDto();
        // Creating a user with the service
        userService.createUser(newUser);
        // Cleaning JPA before getting the object in the database.
        cleanJpa();
        // Checking if the data is the same
        UserVerificationHelper.testDefaultUserValues(userTestHelper.getDefaultUser(), true);
    }
}
