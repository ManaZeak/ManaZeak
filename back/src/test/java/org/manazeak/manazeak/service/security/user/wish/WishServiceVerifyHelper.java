package org.manazeak.manazeak.service.security.user.wish;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.datacreation.security.user.wish.UserWishDtoDataCreation;
import org.manazeak.manazeak.datacreation.security.user.wish.WishDataCreation;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Wish;

import java.util.List;

/**
 * Allows to check a wish in the database.
 */
public class WishServiceVerifyHelper {

    private WishServiceVerifyHelper() {

    }

    /**
     * Check a wish inside the database.
     *
     * @param user   The user associated with the wish.
     * @param wishes The wish to check.
     */
    public static void checkWishCreation(final MzkUser user, final List<Wish> wishes) {
        Wish wish = getWishFromList(wishes);
        Assertions.assertNotNull(wish, "The wish wasn't saved into the database.");
        // Check the user of the wish.
        Assertions.assertNotNull(wish.getMzkUser(), "Not user associated with the wish.");
        Assertions.assertEquals(user.getUserId(), wish.getMzkUser().getUserId());
        // Check the content of the wish.
        Assertions.assertEquals(UserWishDtoDataCreation.WISH_CONTENT, wish.getContent(), "The content of the wish doesn't match");
        // Check the status of the wish.
        Assertions.assertEquals(WishStatusEnum.TODO.getStatusId(), wish.getWishStatus().getWishStatusId(), "The wish doesn't have the good status.");
    }

    /**
     * Check that a wish has changed status.
     *
     * @param user   the user linked to the wish.
     * @param wishes the list of the wish of the user from the database.
     */
    public static void checkStatusWishChanged(final MzkUser user, final List<Wish> wishes) {
        Wish wish = getWishFromList(wishes);
        Assertions.assertNotNull(wish, "The wish wasn't saved into the database.");
        // Check the user of the wish.
        Assertions.assertNotNull(wish.getMzkUser(), "Not user associated with the wish.");
        Assertions.assertEquals(user.getUserId(), wish.getMzkUser().getUserId());
        // Check the content of the wish.
        Assertions.assertEquals(WishDataCreation.WISH_CONTENT, wish.getContent(), "The content of the wish doesn't match");
        // Check the status of the wish.
        Assertions.assertEquals(WishStatusEnum.NOK.getStatusId(), wish.getWishStatus().getWishStatusId(), "The wish doesn't have the good status.");
    }

    /**
     * Check that the database contains only a wish.
     *
     * @param wishes The list of wishes of the database.
     * @return return the wish.
     */
    private static Wish getWishFromList(final List<Wish> wishes) {
        // Checking there is only one wish.
        Assertions.assertEquals(1, wishes.size(), "Wrong number of wishes for te test user.");
        // Getting the wish to test.
        return wishes.get(0);
    }
}
