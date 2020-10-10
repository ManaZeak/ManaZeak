package org.manazeak.manazeak.service.security.user.wish;

import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishListLineDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Wish;

import java.util.List;

/**
 * Manager used to handle the manipulation of wishes.
 */
public interface WishManager {

    /**
     * Get the wish list of a user.
     *
     * @param user the selected user.
     * @return The list of wishes.
     */
    List<Wish> getUserWishes(MzkUser user);

    /**
     * Get all the wishes.
     *
     * @return all the wishes.
     */
    List<UserWishListLineDto> getAllWishes();

    /**
     * Save a user wish into the database.
     *
     * @param user    the user that created the wish.
     * @param wishDto the DTO containing the information about the wish.
     */
    void saveUserWish(MzkUser user, UserWishDto wishDto);

    /**
     * Change a wish to the given status.
     *
     * @param wishId The id of the wish.
     * @param status The target status.
     */
    void changeWishStatus(Long wishId, WishStatusEnum status);
}
