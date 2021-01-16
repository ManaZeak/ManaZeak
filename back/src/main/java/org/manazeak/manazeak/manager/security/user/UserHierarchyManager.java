package org.manazeak.manazeak.manager.security.user;

import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class is used to generate the tree
 */
@Component
public class UserHierarchyManager {

    private final InviteCodeDAO inviteCodeDAO;


    public UserHierarchyManager(InviteCodeDAO inviteCodeDAO) {
        this.inviteCodeDAO = inviteCodeDAO;
    }

    /**
     * Build the tree of the users from the list of users of the application.
     *
     * @param users The list of users of the application.
     * @return The root user linked with its descendants.
     */
    public UserHierarchyDto buildUserHierarchyFromUsers(Iterable<MzkUser> users) {
        Map<Long, MzkUser> userByInviteCodeMap = new HashMap<>();
        // Iterating over the users and filling the map of users.
        for (MzkUser user : users) {
            // Inserting the root user.
            if (user.getInviteCode() == null) {
                userByInviteCodeMap.put(0L, user);
            } else {
                // Inserting normal users.
                userByInviteCodeMap.put(user.getInviteCode().getInviteCodeId(), user);
            }
        }
        // Building the list of linked users from the root (JESUS).
        return createUserHierarchyFromUser(userByInviteCodeMap.get(0L), userByInviteCodeMap);
    }

    /**
     * Generate the hierarchy from a user.
     *
     * @param user                The user to create the hierarchy.
     * @param userByInviteCodeMap The map containing the invite code id linked to the user.
     * @return The user hierarchy object.
     */
    private UserHierarchyDto createUserHierarchyFromUser(MzkUser user, Map<Long, MzkUser> userByInviteCodeMap) {
        // The user can be null, if we are at the end of the hierarchy.
        if (user == null) {
            return null;
        }
        UserHierarchyDto userHierarchy = new UserHierarchyDto();
        userHierarchy.setUserId(user.getUserId());
        userHierarchy.setUsername(user.getUsername());
        List<UserHierarchyDto> children = new ArrayList<>();
        // Adding a children element for all the invite codes.
        for (InviteCode inviteCode : inviteCodeDAO.getInviteCodesByParent(user)) {
            // Creating the child element from the parent.
            UserHierarchyDto child = createUserHierarchyFromUser(
                    userByInviteCodeMap.get(inviteCode.getInviteCodeId()), userByInviteCodeMap
            );
            if (child != null) {
                children.add(child);
            }
        }
        // Adding the children to the object.
        userHierarchy.setChildren(children);
        return userHierarchy;
    }
}
