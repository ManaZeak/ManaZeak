package org.manazeak.manazeak.service.security.user.wish;

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

/**
 * This class is used to test the wishes interactions.
 */
public class WishServiceTest extends AbstractManaZeakTest {

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
}
