package org.manazeak.manazeak.controller.rest.user.wish;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.constant.security.WishStatusEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class allows to manage the wishes of the user for the admin with rest calls.
 */
@RestController
public class WishAdminControllerRest {

    private final WishService wishService;

    private final KommunicatorService kommunicatorService;

    public WishAdminControllerRest(WishService wishService, KommunicatorService kommunicatorService) {
        this.wishService = wishService;
        this.kommunicatorService = kommunicatorService;
    }

    /**
     * Change the status of a wish to accepted.
     *
     * @param wishId The id of the wish to change.
     * @return A successful communicator object.
     */
    @Security(PrivilegeEnum.WISR)
    @PostMapping("/admin/wish/accept/{wishId}")
    public KommunicatorDto acceptWish(@PathVariable Long wishId) {
        wishService.changeWishStatus(wishId, WishStatusEnum.OK);
        return new KommunicatorDto();
    }

    /**
     * Change the status of a wish to non ok.
     *
     * @param wishId The id of wish to change
     * @return A successful communicator object.
     */
    @Security(PrivilegeEnum.WISR)
    @PostMapping("/admin/wish/reject/{wishId}")
    public KommunicatorDto rejectWish(@PathVariable Long wishId) {
        wishService.changeWishStatus(wishId, WishStatusEnum.NOK);
        return new KommunicatorDto();
    }

    /**
     * Change the status of a wish to be reviewed.
     *
     * @param wishId The id of wish to change.
     * @return A successful communicator object.
     */
    @Security(PrivilegeEnum.WISR)
    @PostMapping("/admin/wish/reset/{wishId}")
    public KommunicatorDto resetWish(@PathVariable Long wishId) {
        wishService.changeWishStatus(wishId, WishStatusEnum.TODO);
        return new KommunicatorDto();
    }

    /**
     * Delete a wish in the database.
     *
     * @param wishId The id of the wish to delete.
     * @return The notification for the user.
     */
    @Security(PrivilegeEnum.WISR)
    @PostMapping("/admin/wish/delete/{wishId}")
    public KommunicatorDto deleteWish(@PathVariable Long wishId) {
        wishService.deleteUserWish(wishId);
        return kommunicatorService.buildSuccessKom("user.wish.deleted_title", "user.wish.deleted");
    }
}
