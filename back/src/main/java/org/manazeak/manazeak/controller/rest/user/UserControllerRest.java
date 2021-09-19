package org.manazeak.manazeak.controller.rest.user;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.manazeak.manazeak.service.security.user.UserService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

/**
 * Allows to manage the users of the application.
 */
@RestController
public class UserControllerRest {

    private final UserService userService;

    private final KommunicatorService kommunicatorService;

    public UserControllerRest(UserService userService, KommunicatorService kommunicatorService) {
        this.userService = userService;
        this.kommunicatorService = kommunicatorService;
    }

    /**
     * Delete a user of the application.
     *
     * @param userId The id of the user.
     * @return The notification for the user.
     */
    @Security(PrivilegeEnum.ADMV)
    @PostMapping("/admin/user/delete/{userId}")
    public KommunicatorDto deleteUser(@NotNull(message = "user.error.empty_id") @PathVariable Long userId) {
        userService.deleteUser(userId);
        return getUserDeletedKom();
    }

    /**
     * Deactivate a user in the database.
     *
     * @param userId The id of the user.
     * @return The notification for the user.
     */
    @Security(PrivilegeEnum.ADMV)
    @PostMapping("/admin/user/deactivate/{userId}")
    public KommunicatorDto deactivateUser(@NotNull(message = "user.error.empty_id") @PathVariable Long userId) {
        userService.deactivateUser(userId);
        return getUserDeletedKom();
    }

    /**
     * Get a kommunicator object with a deleted user notification.
     *
     * @return The kommunicator object.
     */
    private KommunicatorDto getUserDeletedKom() {
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "user.delete.success");
    }
}
