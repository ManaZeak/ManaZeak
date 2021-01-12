package org.manazeak.manazeak.manager.security.user;

import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineProjection;
import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.security.invitecode.InviteCodeManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Interacts with the user for the admin.
 */
@Component
public class AdminUserManager {

    private static final String USER_NOT_FOUND = "user.error.not_found";
    private static final String USER_NOT_FOUND_TITLE = "user.error.not_found_title";
    private final MzkUserDAO userDAO;
    private final UserProfileManager userProfileManager;
    private final InviteCodeManager inviteCodeManager;

    public AdminUserManager(MzkUserDAO userDAO, UserProfileManager userProfileManager, InviteCodeManager inviteCodeManager) {
        this.userDAO = userDAO;
        this.userProfileManager = userProfileManager;
        this.inviteCodeManager = inviteCodeManager;
    }

    /**
     * Get the object containing the users in a tree form.
     *
     * @return the tree of users.
     */
    public UserHierarchyDto getUserHierarchy() {
        // Get all the users of the database.
        Iterable<MzkUser> users = userDAO.findAll();
        // Build the hierarchy of the users.
        return UserHierarchyHelper.buildUserHierarchyFromUsers(users);
    }

    /**
     * Get all the users from the database with all the information.
     *
     * @return the user list.
     */
    public List<UserListLineDto> getUserList() {
        // Get all the users available in the database.
        List<UserListLineProjection> usersProjection = userDAO.getAllLineUsers();
        // Converting the projection object to standard users.
        return userProfileManager.convertUserListLineProjectionToDto(usersProjection);
    }

    /**
     * Delete a user in the database by it's id. Throw an exception if no user were deleted.
     *
     * @param userId The id associated with the deleted user.
     */
    public void deleteUserById(Long userId) {
        // Getting the user
        MzkUser user = userDAO.findById(userId)
                .orElseThrow(MzkExceptionHelper.generateMzkRuntimeException(USER_NOT_FOUND, USER_NOT_FOUND_TITLE));
        // Getting the parent of the user.
        MzkUser parent = user.getInviteCode().getParent();
        // If the user has no parent, then we cannot delete him.
        if (parent == null) {
            throw new MzkRuntimeException(
                    "user.error.delete_parent",
                    "user.error.lock_out_protection_title"
            );
        }
        // Changing the invite codes of the user.
        inviteCodeManager.changeUserInviteCodeOwner(user, parent);
        InviteCode invite = user.getInviteCode();
        // Deleting the user.
        userDAO.delete(user);
        inviteCodeManager.deleteInviteCode(invite);
    }

    /**
     * Deactivate a user in the database by it's id.
     *
     * @param userId the user id.
     */
    public void deactivateUserById(Long userId) {
        MzkUser user = userDAO.findById(userId)
                .orElseThrow(MzkExceptionHelper.generateMzkRuntimeException(USER_NOT_FOUND, USER_NOT_FOUND_TITLE));
        user.setIsActive(false);
        userDAO.save(user);
    }
}
