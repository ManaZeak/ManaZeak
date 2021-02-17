package org.manazeak.manazeak.service.security.user;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.daos.security.InviteCodeDAO;
import org.manazeak.manazeak.daos.security.MzkUserDAO;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * Test that the user deletion works properly.
 */
class UserDeletionServiceTest extends AbstractManaZeakTest {

    @Autowired
    private MzkUserDataCreation userDataCreation;

    @Autowired
    private UserService userService;

    @Autowired
    private MzkUserDAO userDAO;

    @Autowired
    private InviteCodeDAO inviteCodeDAO;

    /**
     * Test that the user deletion works properly.
     */
    @Test
    void testLeafUserDeletion() {
        // Getting the user already inserted into the database.
        MzkUser parent = userDAO.findById(1L).get();
        // Creating multiple users.
        MzkUser son1 = userDataCreation.createUserWithParent(parent, "a");
        MzkUser son2 = userDataCreation.createUserWithParent(son1, "b");
        // Trying to delete the last user created.
        Long lastUserId = son2.getUserId();
        userService.deleteUser(lastUserId);
        testUserHasBeenDeleted(lastUserId);
    }

    @Test
    void testIntermediateUserDeletion() {
        // Getting the user already inserted into the database.
        MzkUser parent = userDAO.findById(1L).get();
        // Creating multiple users.
        MzkUser son1 = userDataCreation.createUserWithParent(parent, "a");
        Long sonId = userDataCreation.createUserWithParent(son1, "b").getUserId();
        // Trying to delete the last user created.
        Long lastUserId = son1.getUserId();
        userService.deleteUser(lastUserId);
        testUserHasBeenDeleted(lastUserId);
        cleanJpa();
        // Check that the parent of the son2 is the parent of the deleted user.
        Long newParentId = userDAO.findById(sonId).get().getInviteCode().getParent().getUserId();
        Assertions.assertEquals(parent.getUserId(), newParentId, "The delete user children haven't been transferred to the parent.");
    }


    /**
     * Check if a user has been deleted from the application.
     *
     * @param userId The id of the user that will be deleted.
     */
    public void testUserHasBeenDeleted(Long userId) {
        // Checking if the user still exists in the database.
        Optional<MzkUser> userOpt = userDAO.findById(userId);
        if (userOpt.isPresent()) {
            Assertions.fail("The user hasn't been deleted from the database.");
        }
    }
}
