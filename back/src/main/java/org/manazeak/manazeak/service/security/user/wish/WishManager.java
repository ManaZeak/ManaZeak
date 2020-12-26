package org.manazeak.manazeak.service.security.user.wish;

import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.daos.security.WishDAO;
import org.manazeak.manazeak.daos.security.WishStatusDAO;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishListLineDto;
import org.manazeak.manazeak.entity.dto.user.wish.WishesDisplayDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Wish;
import org.manazeak.manazeak.entity.security.WishStatus;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.service.message.MessageManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Used to manipulate wishes in services.
 */
@Service
public class WishManager {

    private static final String WISH_STATUS = "user.wish.status.";
    private final WishDAO wishDAO;
    private final WishStatusDAO wishStatusDAO;
    private final MessageManager messageManager;

    public WishManager(final WishDAO wishDAO, WishStatusDAO wishStatusDAO, final MessageManager messageSource) {
        this.wishDAO = wishDAO;
        this.wishStatusDAO = wishStatusDAO;
        this.messageManager = messageSource;
    }

    /**
     * Get the wish list of a user.
     *
     * @param user the selected user.
     * @return The list of wishes.
     */
    public List<Wish> getUserWishes(MzkUser user) {
        return wishDAO.getAllByMzkUserOrderByWishStatusDesc(user);
    }

    /**
     * Get all the wishes.
     *
     * @return all the wishes.
     */
    public WishesDisplayDto getAllWishes() {
        WishesDisplayDto wishes = new WishesDisplayDto();
        // Getting all the wishes of the database.
        for (Wish wish : wishDAO.findAll()) {
            UserWishListLineDto wishLine = new UserWishListLineDto();
            wishLine.setWishId(wish.getWishId());
            wishLine.setContent(wish.getContent());
            wishLine.setStatus(getStatusString(wish.getWishStatus()));
            wishLine.setUsername(wish.getMzkUser().getUsername());
            // Adding the wish to the right collection.
            if (WishStatusEnum.OK.getStatusId().equals(wish.getWishStatus().getWishStatusId())) {
                wishes.addAcceptedWish(wishLine);
            } else if (WishStatusEnum.NOK.getStatusId().equals(wish.getWishStatus().getWishStatusId())) {
                wishes.addRefusedWish(wishLine);
            } else if (WishStatusEnum.TODO.getStatusId().equals(wish.getWishStatus().getWishStatusId())) {
                wishes.addTodoWish(wishLine);
            }
        }
        return wishes;
    }

    /**
     * Save a user wish into the database.
     *
     * @param user    the user that created the wish.
     * @param wishDto the DTO containing the information about the wish.
     */
    public void saveUserWish(MzkUser user, UserWishDto wishDto) {
        // Creating the new wish for the user
        Wish wish = new Wish();
        wish.setMzkUser(user);
        wish.setContent(wishDto.getContent());
        wish.setWishStatus(wishStatusDAO.getWishStatusByWishStatusId(WishStatusEnum.TODO.getStatusId()));
        wishDAO.save(wish);
    }

    /**
     * Change a wish to the given status.
     *
     * @param wishId The id of the wish.
     * @param status The target status.
     */
    public void changeWishStatus(Long wishId, WishStatusEnum status) {
        // Trying to get the wish
        Optional<Wish> wishOpt = wishDAO.findById(wishId);
        if (wishOpt.isEmpty()) {
            throw new MzkRuntimeException("The wish can't be found.");
        }
        Wish wish = wishOpt.get();
        // Setting the status with the enum.
        wish.setWishStatus(wishStatusDAO.getWishStatusByWishStatusId(status.getStatusId()));
        //saving the wish
        wishDAO.save(wish);
    }

    /**
     * Get the localized string from the code of the status.
     *
     * @return The status in a string format
     */
    private String getStatusString(WishStatus status) {
        return messageManager.getMessage(WISH_STATUS + status.getCode());
    }
}
