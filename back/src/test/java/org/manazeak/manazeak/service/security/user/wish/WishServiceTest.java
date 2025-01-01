package org.manazeak.manazeak.service.security.user.wish;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.daos.security.WishDAO;
import org.manazeak.manazeak.datacreation.security.user.MzkUserDataCreation;
import org.manazeak.manazeak.datacreation.security.user.UserTestConstants;
import org.manazeak.manazeak.datacreation.security.user.wish.UserWishDtoDataCreation;
import org.manazeak.manazeak.datacreation.security.user.wish.WishDataCreation;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Wish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.List;
import java.util.Optional;

/**
 * This class is used to test the wishes interactions.
 */
class WishServiceTest extends AbstractManaZeakTest {

    @Autowired
    private WishService wishService;

    @Autowired
    private UserWishDtoDataCreation userWishDtoDataCreation;

    @Autowired
    private MzkUserDataCreation userDataCreation;

    @Autowired
    private WishDataCreation wishDataCreation;

    @Autowired
    private WishDAO wishDAO;

    /**
     * Checks if a wish is saved correctly.
     */
    @Test
    @WithMockUser(username = UserTestConstants.USERNAME)
    void testSaveWishTest() {
        // Creating the user in the database.
        MzkUser user = userDataCreation.createDefaultMzkUser();
        // Creating the wish
        wishService.saveCurrentUserWish(userWishDtoDataCreation.createUserWishDto());
        // Getting the wish that was created.
        List<Wish> wishes = wishDAO.getAllByMzkUserOrderByWishStatusDesc(user);
        // Checking the wish.
        WishServiceVerifyHelper.checkWishCreation(user, wishes);
    }

    /**
     * Check if the wish has changed it's status.
     */
    @Test
    void testChangeWishStatus() {
        // Creating the default user.
        MzkUser user = userDataCreation.createDefaultMzkUser();
        // Creating a wish in the database.
        Wish wish = wishDataCreation.createWishForUser(user);
        // Modifying the status of the wish.
        wishService.changeWishStatus(wish.getWishId(), WishStatusEnum.NOK);
        // Getting the list of wish for the user.
        List<Wish> wishes = wishDAO.getAllByMzkUserOrderByWishStatusDesc(user);
        // Checking the wish.
        WishServiceVerifyHelper.checkStatusWishChanged(user, wishes);
    }

    @Test
    @WithMockUser(username = UserTestConstants.USERNAME)
    void testDeleteWishForCurrentUser() {
        // Creating the default user.
        MzkUser user = userDataCreation.createDefaultMzkUser();
        // Creating the wish for the user in the database.
        Wish wish = wishDataCreation.createWishForUser(user);
        // Deleting the wish for the user.
        wishService.deleteCurrentUserWish(wish.getWishId());
        // Checking if the wish has been deleted.
        Optional<Wish> wishDb = wishDAO.findById(wish.getWishId());
        if (wishDb.isPresent()) {
            Assertions.fail("The wish of the user shouldn't exist.");
        }
    }

    /**
     * Test that if a user try to delete a wish of another user.
     */
    @Test
    @WithMockUser(username = UserTestConstants.USERNAME)
    void testDeleteWishForOtherUserNotPermitted() {
        // Creating the logged-in user.
        userDataCreation.createDefaultMzkUser();
        // Creating the user linked to the wish
        MzkUser user = userDataCreation.createMultipleMzkUser(1);
        // Creating the wish.
        Wish wish = wishDataCreation.createWishForUser(user);
        // Trying to delete the wish
        try {
            wishService.deleteCurrentUserWish(wish.getWishId());
        } catch (Exception e) {
            return;
        }
        Assertions.fail("The wish shouldn't have been suppressed.");
    }
}
