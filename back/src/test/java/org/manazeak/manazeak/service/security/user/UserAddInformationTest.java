package org.manazeak.manazeak.service.security.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.security.user.UserFirstInfoDataCreation;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.file.TestImageGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;

import java.io.IOException;
import java.util.Optional;

/**
 * This class test that the add user information works properly.
 */
class UserAddInformationTest extends AbstractManaZeakTest {

    @Autowired
    private MzkUserDataCreation userDataCreation;
    @Autowired
    private UserFirstInfoDataCreation firstInfoDataCreation;
    @Autowired
    private TestImageGetter imageGetter;
    @Autowired
    private UserService userService;
    @Autowired
    private AdditionalInfoManager additionalInfoManager;

    /**
     * Test that when a user add some information to his profile it fills the database.
     */
    @Test
    @WithMockUser(username = UserTestConstants.USERNAME)
    void testAddUserInformation() throws IOException {
        // Creating the default user.
        userDataCreation.createDefaultMzkUser();
        // Creating the object for adding some information.
        UserFirstInfoDto info = firstInfoDataCreation.generateOkFirstInfo(
                imageGetter.getMultipartFile(TestImageGetter.JPG_OK));
        // Filling the user with the information
        additionalInfoManager.addUserInformation(info);
        // Getting the user and checking if the information has been added.
        Optional<MzkUser> user = userService.findByUsername(UserTestConstants.USERNAME);
        Assertions.assertTrue(user.isPresent(), "The user wasn't found in the database.");
        UserAddInformationVerifyHelper.checkUserHasBeenFilled(user.get());
    }
}
