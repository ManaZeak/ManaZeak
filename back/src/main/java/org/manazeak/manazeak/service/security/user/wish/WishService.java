package org.manazeak.manazeak.service.security.user.wish;

import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.entity.dto.user.wish.WishesDisplayDto;
import org.manazeak.manazeak.entity.security.Wish;

import java.util.List;

/**
 * Allows to controls wishes for the users.
 */
public interface WishService {

    /**
     * Get all the wishes of the current user.
     *
     * @return the wishes of the current connected user.
     */
    List<Wish> getCurrentUserWishes();

    /**
     * Get all the wishes of the application.
     *
     * @return all the wishes.
     */
    WishesDisplayDto getAllWishes();

    /**
     * The the wish of the current user.
     *
     * @param wishDto The DTO containing the wish of the user.
     */
    void saveCurrentUserWish(UserWishDto wishDto);

    /**
     * Change a wish to the given status.
     *
     * @param wishId The id of the wish.
     * @param status The target status.
     */
    void changeWishStatus(Long wishId, WishStatusEnum status);

    /**
     * Delete a wish from the application.
     *
     * @param wishId The wish that will be deleted.
     */
    void deleteUserWish(Long wishId);

    /**
     * Delete a wish from the application that has been created by the connected user.
     *
     * @param wishId The wish that will be deleted.
     */
    void deleteCurrentUserWish(Long wishId);
}
