package org.manazeak.manazeak.service.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.user.MzkUserDataCreation;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

/**
 * This class test the user creation system.
 */
public class UserCreationServiceTest extends AbstractManaZeakTest {

    @Autowired
    private MzkUserDataCreation mzkUserDataCreation;

    @Autowired
    private UserService userService;

    /*
    public UserCreationServiceTest(MzkUserDataCreation mzkUserDataCreation, UserService userService) {
        this.mzkUserDataCreation = mzkUserDataCreation;
        this.userService = userService;
    }*/

    /**
     * Test the login getter works properly.
     */
    @Test
    public void findByLoginTest() {
        // Creating a user in th database.
        mzkUserDataCreation.createDefaultMzkUser();
        // Cleaning the JPA to have only DB results.
        cleanJpa();
        // Getting the user with service
        Optional<MzkUser> optUserTest = userService.findByUsername(MzkUserDataCreation.USERNAME);
        // Checking if there is a user present.
        Assertions.assertTrue(optUserTest.isPresent(), "The user wasn't found.");
        MzkUser userTest = optUserTest.get();
        // Checking if the data is the same.
        Assertions.assertEquals(MzkUserDataCreation.USERNAME, userTest.getUsername(), "The username didn't match.");
        Assertions.assertEquals(MzkUserDataCreation.MAIL, userTest.getMail(), "The email field didn't match.");
        Assertions.assertEquals(MzkUserDataCreation.PASSWORD, userTest.getPassword(), "The password didn't match.");
    }
}
