package org.manazeak.manazeak.service.security.user;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.util.DateUtil;

/**
 * Verify the user object after it has been filled with the information.
 */
public class UserAddInformationVerifyHelper {

    private UserAddInformationVerifyHelper() {

    }

    /**
     * Check that a given user has been filled correctly.
     *
     * @param user The user to check.
     */
    public static void checkUserHasBeenFilled(MzkUser user) {
        Assertions.assertEquals(UserTestConstants.BIO, user.getBio(), "Bio field doesn't match");
        Assertions.assertEquals(UserTestConstants.SURNAME, user.getSurname(), "Surname doesn't match");
        Assertions.assertEquals(UserTestConstants.NAME, user.getName(), "Name doesn't match");
        Assertions.assertEquals(UserTestConstants.LOCALE_ID, user.getLocale().getLocaleId(), "The locale of the" +
                " user doesn't match");
        Assertions.assertEquals(UserTestConstants.COUNTRY_ID, user.getCountry().getCountryId(), "The country" +
                " doesn't match");
        Assertions.assertEquals(DateUtil.parseString(UserTestConstants.BIRTH_DATE, DateUtil.US_DATE_FORMATTER),
                user.getBirthDate(), "The birth date doesn't match.");
    }
}
