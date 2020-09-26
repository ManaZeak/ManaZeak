package org.manazeak.manazeak.controller.rest.user.wish;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.rest.AbstractRestController;
import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.manazeak.manazeak.entity.dto.user.wish.UserWishDto;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Allows to manipulate wishes for a user.
 */
@RestController
public class WishUserControllerRest extends AbstractRestController {

    private final WishService wishService;

    public WishUserControllerRest(WishService wishService) {
        this.wishService = wishService;
    }

    /**
     * Create a wish for the current user.
     *
     * @return The status of the request.
     */
    @RestSecurity(PrivilegeEnum.WISH)
    @PostMapping("/wish")
    public KommunicatorObject createWishForCurrentUser(@RequestParam @Valid UserWishDto wishDto) {
        wishService.saveCurrentUserWish(wishDto);
        return new KommunicatorObject();
    }
}
