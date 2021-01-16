package org.manazeak.manazeak.datacreation.security.user.wish;

import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.daos.security.WishDAO;
import org.manazeak.manazeak.daos.security.WishStatusDAO;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Wish;
import org.springframework.stereotype.Component;

/**
 * Allows to create wishes in the database.
 */
@Component
public class WishDataCreation {

    public static final String WISH_CONTENT = "SAVED WISH CONTENT.";

    private final WishDAO wishDAO;

    private final WishStatusDAO wishStatusDAO;

    public WishDataCreation(WishDAO wishDAO, WishStatusDAO wishStatusDAO) {
        this.wishDAO = wishDAO;
        this.wishStatusDAO = wishStatusDAO;
    }

    /**
     * Creates a wish for the user passed in param.
     *
     * @param user the user linked to the created wish.
     * @return The wish that has been created.
     */
    public Wish createWishForUser(MzkUser user) {
        Wish wish = new Wish();
        wish.setContent(WISH_CONTENT);
        wish.setMzkUser(user);
        wish.setWishStatus(wishStatusDAO.findById(WishStatusEnum.TODO.getStatusId()).get());
        wishDAO.save(wish);
        return wish;
    }
}
