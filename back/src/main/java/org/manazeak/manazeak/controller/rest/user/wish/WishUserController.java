package org.manazeak.manazeak.controller.rest.user.wish;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.manazeak.manazeak.service.security.user.wish.WishService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

/**
 * Allows the user to interact wish his wishes
 */
@RestController
public class WishUserController {

    private final WishService wishService;

    private final KommunicatorService kommunicatorService;

    public WishUserController(WishService wishService, KommunicatorService kommunicatorService) {
        this.wishService = wishService;
        this.kommunicatorService = kommunicatorService;
    }

    @RestSecurity(PrivilegeEnum.WISH)
    @PostMapping("/wish/delete/{wishId}")
    public KommunicatorDto deleteCurrentUserWish(@NotNull(message = "user.wish.error.empty_id")
                                                 @PathVariable Long wishId) {
        // Trying to delete the selected wish for the current user.
        wishService.deleteCurrentUserWish(wishId);
        // Sending a success notification to the front.
        return kommunicatorService.buildSuccessKom("user.wish.delete_title", "user.wish.deleted");
    }
}
