package org.manazeak.manazeak.datacreation.security.admin;

import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserHierarchyDataCreation {

    /**
     * Generate the hierarchy for the test case.
     * @return the tree of users.
     */
    public UserHierarchyDto generateTreeUserHierarchy() {
        // Setting the information for the root user.
        UserHierarchyDto userHierarchy = new UserHierarchyDto();
        userHierarchy.setUsername(UserTestConstants.ADMIN_USERNAME);
        userHierarchy.setUserId(1L);
        // Creating the list of children
        List<UserHierarchyDto> child = new ArrayList<>();
        // Creating the child
        UserHierarchyDto childElement = new UserHierarchyDto();
        childElement.setUsername(UserTestConstants.USERNAME+1);
        // Creating the sub child
        List<UserHierarchyDto> child2 = new ArrayList<>();
        UserHierarchyDto childElement2 = new UserHierarchyDto();
        childElement2.setUsername(UserTestConstants.USERNAME+2);
        child2.add(childElement2);
        childElement.setChildren(child2);
        // Adding the child
        child.add(childElement);
        userHierarchy.setChildren(child);

        return userHierarchy;
    }

}
