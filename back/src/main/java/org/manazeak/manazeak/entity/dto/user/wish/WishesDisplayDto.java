package org.manazeak.manazeak.entity.dto.user.wish;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains all the wishes sorted by status.
 */
@Data
public class WishesDisplayDto {

    private final List<UserWishListLineDto> todoWishes = new ArrayList<>();

    private final List<UserWishListLineDto> refusedWishes = new ArrayList<>();

    private final List<UserWishListLineDto> acceptedWishes = new ArrayList<>();

    /**
     * Add a wish to the list of to be done wishes.
     *
     * @param wish the wish that will be added to the object.
     */
    public void addTodoWish(UserWishListLineDto wish) {
        todoWishes.add(wish);
    }

    /**
     * Add a wish to refused wishes list.
     *
     * @param wish the wish to be added
     */
    public void addRefusedWish(UserWishListLineDto wish) {
        refusedWishes.add(wish);
    }

    /**
     * Add a wish to the accepted wishes
     *
     * @param wish the accepted wish to be added.
     */
    public void addAcceptedWish(UserWishListLineDto wish) {
        acceptedWishes.add(wish);
    }
}
