package org.manazeak.manazeak.datacreation.security.user.wish;

import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.springframework.stereotype.Component;

/**
 * Allows to create wish for unit tests.
 */
@Component
public class UserWishDtoDataCreation {

    public static final String WISH_CONTENT = "WISH CONTENT TU";

    /**
     * Creates a {@link UserWishDto} for unit test.
     *
     * @return the wish send by the user.
     */
    public UserWishDto createUserWishDto() {
        UserWishDto userWishDto = new UserWishDto();
        userWishDto.setContent(WISH_CONTENT);
        return userWishDto;
    }
}
