package org.manazeak.manazeak.service.security.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.security.user.MzkUserEditDataCreation;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.manazeak.manazeak.service.security.user.info.UserInformationService;
import org.manazeak.manazeak.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Date;

/**
 * Allow us to test the user edition.
 */
class UserEditServiceTest extends AbstractManaZeakTest {

    @Autowired
    private MzkUserDataCreation userDataCreation;

    @Autowired
    private MzkUserEditDataCreation userEditDataCreation;

    @Autowired
    private UserInformationService userInformationService;

    @Autowired
    private UserManager userManager;

    /**
     * Test that a standard user edition works.
     */
    @Test
    @WithMockUser(username = UserTestConstants.USERNAME)
    void testEditUser() {
        // Creating the default user.
        userDataCreation.createDefaultMzkUser();
        // Modifying the user into the database.
        userInformationService.saveCurrentUserEditInformation(userEditDataCreation.getMzkUserEditDto());
        // Checking if the modification are correct.
        checkUserModified();
    }

    /**
     * Check that the default user has been modified.
     */
    private void checkUserModified() {
        // Getting the current user.
        MzkUser user = userManager.getCurrentUser();
        // Checking if the curent user has been modified.
        Assertions.assertEquals(UserTestConstants.NAME_EDITED, user.getName(), "The name of the user wasn't edited.");
        Assertions.assertEquals(UserTestConstants.SURNAME_EDITED, user.getSurname(), "The surname of the user wasn't edited.");
        Assertions.assertEquals(UserTestConstants.BIO_EDITED, user.getBio(), "The bio of the user wasn't edited.");
        Assertions.assertEquals(UserTestConstants.BIRTH_DATE_EDITED, DateUtil.formatDate(user.getBirthDate(), DateUtil.US_DATE_FORMATTER), "The birth date wasn't edited.");
        Assertions.assertEquals(UserTestConstants.COUNTRY_ID_EDITED, user.getCountry().getCountryId(), "The country of the user wasn't edited.");
        Assertions.assertEquals(UserTestConstants.LOCALE_ID_EDITED, user.getLocale().getLocaleId(), "The locale of the user wasn't edited.");
        Assertions.assertEquals(UserTestConstants.MAIL_EDITED, user.getMail(), "The mail of the user wasn't edited.");
    }

}
