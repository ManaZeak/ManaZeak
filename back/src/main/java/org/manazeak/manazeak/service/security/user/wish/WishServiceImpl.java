package org.manazeak.manazeak.service.security.user.wish;

import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.entity.dto.user.wish.WishesDisplayDto;
import org.manazeak.manazeak.entity.security.Wish;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.manazeak.manazeak.manager.security.user.wish.WishManager;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Allows to manipulate wishes for the users.
 */
@Service
public class WishServiceImpl implements WishService {

    private final WishManager wishManager;

    private final UserManager userManager;

    public WishServiceImpl(final WishManager wishManager, final UserManager userManager) {
        this.wishManager = wishManager;
        this.userManager = userManager;
    }

    /**
     * Get all the wishes of the current user.
     *
     * @return the wishes of the current connected user.
     */
    @Override
    public List<Wish> getCurrentUserWishes() {
        return wishManager.getUserWishes(userManager.getCurrentUser());
    }

    /**
     * Get all the wishes of the application.
     *
     * @return all the wishes.
     */
    @Override
    public WishesDisplayDto getAllWishes() {
        return wishManager.getAllWishes();
    }

    /**
     * The the wish of the current user.
     *
     * @param wishDto The DTO containing the wish of the user.
     */
    @Override
    public void saveCurrentUserWish(UserWishDto wishDto) {
        wishManager.saveUserWish(userManager.getCurrentUser(), wishDto);
    }

    /**
     * Change a wish to the given status.
     *
     * @param wishId The id of the wish.
     * @param status The target status.
     */
    @Override
    public void changeWishStatus(Long wishId, WishStatusEnum status) {
        wishManager.changeWishStatus(wishId, status);
    }

}
