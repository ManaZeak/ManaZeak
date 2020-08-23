package org.manazeak.manazeak.service.security.admin;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;

public final class UserHierarchyValidationHelper {

    private UserHierarchyValidationHelper() {

    }

    /**
     * Check that the two object of user hierarchy are the same.
     * @param userHierarchy The user hierarchy generated by the service.
     * @param expectedUserHierarchy The expected user hierarchy.
     */
    public static void checkUserHierarchyIsSame(UserHierarchyDto userHierarchy, UserHierarchyDto expectedUserHierarchy) {
        // The test is finished.
        if (expectedUserHierarchy == null) {
            if (userHierarchy == null) {
                return;
            } else {
                Assertions.fail("The user hierarchy generated by the service contains too much objects.");
            }
        }
        Assertions.assertNotNull(userHierarchy, "The user hierarchy shouldn't be null.");
        Assertions.assertEquals(expectedUserHierarchy.getUsername(), userHierarchy.getUsername(),
                "The usernames doesn't match.");
        if (expectedUserHierarchy.getChildren().size() == 0 && userHierarchy.getChildren().size() == 0) {
            return;
        }
        checkUserHierarchyIsSame(userHierarchy.getChildren().get(0), expectedUserHierarchy.getChildren().get(0));
    }

}
