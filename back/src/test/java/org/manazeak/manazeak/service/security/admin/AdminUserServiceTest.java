package org.manazeak.manazeak.service.security.admin;

import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.datacreation.security.admin.UserHierarchyDataCreation;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.springframework.beans.factory.annotation.Autowired;

public class AdminUserServiceTest extends AbstractManaZeakTest {

    @Autowired
    MzkUserDataCreation userDataCreation;
    @Autowired
    UserHierarchyDataCreation userHierarchyDataCreation;
    @Autowired
    AdminUserService adminUserService;

    /**
     * Test that the hierarchy of users is generated correctly.
     */
    @Test
    void testGenerationUserHierarchy() {
        // Generating the user into the database.
        userDataCreation.createMultipleMzkUser(2);
        // Generating the expected result.
        UserHierarchyDto expectedHierarchy = userHierarchyDataCreation.generateTreeUserHierarchy();
        // Comparing the results
        UserHierarchyDto userHierarchy = adminUserService.getUserHierarchy();
        UserHierarchyValidationHelper.checkUserHierarchyIsSame(userHierarchy, expectedHierarchy);
    }
}
