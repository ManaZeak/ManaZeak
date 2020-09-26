package org.manazeak.manazeak.controller.rest.user.wish;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.controller.rest.AbstractRestController;
import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class allows to manage the wishes of the user for the admin with rest calls.
 */
@RestController
public class WishAdminControllerRest extends AbstractRestController {

    private final WishService wishService;

    public WishAdminControllerRest(WishService wishService) {
        this.wishService = wishService;
    }

    /**
     * Change the status of a wish to accepted.
     *
     * @param wishId The id of the wish to change.
     */
    @Security(PrivilegeEnum.WISR)
    @GetMapping("/admin/wish/accept/{wishId}")
    public KommunicatorObject acceptWish(@PathVariable Long wishId) {
        wishService.changeWishStatus(wishId, WishStatusEnum.OK);
        return new KommunicatorObject();
    }

    /**
     * Change the status of a wish to non ok.
     *
     * @param wishId The id of wish to change
     */
    @Security(PrivilegeEnum.WISR)
    @GetMapping("/admin/wish/reject/{wishId}")
    public KommunicatorObject rejectWish(@PathVariable Long wishId) {
        wishService.changeWishStatus(wishId, WishStatusEnum.NOK);
        return new KommunicatorObject();
    }

    /**
     * Change the status of a wish to be reviewed.
     *
     * @param wishId The id of wish to change
     */
    @Security(PrivilegeEnum.WISR)
    @GetMapping("/admin/wish/reset/{wishId}")
    public KommunicatorObject resetWish(@PathVariable Long wishId) {
        wishService.changeWishStatus(wishId, WishStatusEnum.TODO);
        return new KommunicatorObject();
    }
}
