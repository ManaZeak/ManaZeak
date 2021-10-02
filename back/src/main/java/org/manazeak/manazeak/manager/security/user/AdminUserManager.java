package org.manazeak.manazeak.manager.security.user;

import org.manazeak.manazeak.constant.notification.user.UserNotificationEnum;
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

    private final MzkUserDAO userDAO;
    private final UserProfileManager userProfileManager;
    private final InviteCodeManager inviteCodeManager;
    private final UserHierarchyManager userHierarchyManager;

    public AdminUserManager(MzkUserDAO userDAO, UserProfileManager userProfileManager,
                            InviteCodeManager inviteCodeManager, UserHierarchyManager userHierarchyManager) {
        this.userDAO = userDAO;
        this.userProfileManager = userProfileManager;
        this.inviteCodeManager = inviteCodeManager;
        this.userHierarchyManager = userHierarchyManager;
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
        return userHierarchyManager.buildUserHierarchyFromUsers(users);
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
        MzkUser user = getUser(userId);
        // Getting the parent of the user.
        MzkUser parent = user.getInviteCode().getParent();
        // If the user has no parent, then we cannot delete him.
        if (parent == null) {
            throw new MzkRuntimeException("The user tried to delete the root user.",
                    UserNotificationEnum.ERROR_DELETING_ADMIN);
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
        MzkUser user = getUser(userId);
        user.setIsActive(false);
        userDAO.save(user);
    }

    /**
     * Get the user contained in the database.
     * @param userId The id of the user.
     * @return The user in the database.
     */
    public MzkUser getUser(Long userId) {
        return userDAO.findById(userId).orElseThrow(
                MzkExceptionHelper.generateMzkRuntimeException(
                        "The user doesn't exists",
                        UserNotificationEnum.USER_NOT_FOUND_ERROR)
        );
    }
}
