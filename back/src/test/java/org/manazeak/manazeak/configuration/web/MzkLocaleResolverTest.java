package org.manazeak.manazeak.configuration.web;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.service.security.user.UserTestManipulator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Locale;

/**
 * This class is used to test that the selected locale is correct.
 */
class MzkLocaleResolverTest extends AbstractManaZeakTest {

    @Autowired
    UserTestManipulator userManipulator;
    @Autowired
    private MzkLocalResolver localResolver;
    @Autowired
    private MzkUserDataCreation userDataCreation;

    /**
     * Test that a user without any option in his browser display the default language.
     */
    @Test
    @WithAnonymousUser
    void testLocaleResolveWithoutDefaultLocale() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        Locale userLocale = localResolver.resolveLocale(request);
        Assertions.assertEquals(Locale.US, userLocale, "The default locale isn't English.");
    }

    /**
     * Test that a user with a preferred local in his request display his preferred language.
     */
    @Test
    @WithAnonymousUser
    void testLocaleResolveWithDefaultLocale() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addPreferredLocale(Locale.FRANCE);
        Locale userLocale = localResolver.resolveLocale(request);
        Assertions.assertEquals(Locale.FRANCE, userLocale, "The locale has not been selected.");
    }

    /**
     * Testing that a user without a locale in the database is English.
     */
    @Test
    @WithMockUser(username = UserTestConstants.USERNAME)
    void testLocaleResolveWithUserWithoutLocale() {
        // Creating the default user that will be sued during the test.
        userDataCreation.createDefaultMzkUser();
        MockHttpServletRequest request = new MockHttpServletRequest();
        Locale userLocale = localResolver.resolveLocale(request);
        Assertions.assertEquals(Locale.US, userLocale, "The default locale isn't English.");
    }

    @Test
    @WithMockUser(username = UserTestConstants.USERNAME)
    void testLocaleResolveWithUserWithLocale() {
        // Creating the user in the database.
        userDataCreation.createDefaultMzkUser();
        // Setting the locale of the user to French.
        userManipulator.addLocaleToUser(1L);
        // Checking if the selected locale is correct.
        MockHttpServletRequest request = new MockHttpServletRequest();
        Locale userLocale = localResolver.resolveLocale(request);
        Assertions.assertEquals(Locale.FRANCE, userLocale, "The locale has not been selected.");
    }
}
