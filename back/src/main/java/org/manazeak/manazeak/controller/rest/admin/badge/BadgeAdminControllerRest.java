package org.manazeak.manazeak.controller.rest.admin.badge;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeUserAssociationDto;
import org.manazeak.manazeak.service.error.ErrorHandlerService;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.manazeak.manazeak.service.security.user.badge.BadgeService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class BadgeAdminControllerRest {

    /**
     * Allows to handle the reporting of errors to the front.
     */
    private final ErrorHandlerService errorHandler;

    private final BadgeService badgeService;

    private final KommunicatorService kommunicatorService;

    public BadgeAdminControllerRest(BadgeService badgeService, ErrorHandlerService errorHandler,
                                    KommunicatorService kommunicatorService) {
        this.badgeService = badgeService;
        this.errorHandler = errorHandler;
        this.kommunicatorService = kommunicatorService;
    }

    /**
     * Associate a user with a badge.
     *
     * @param badgeUserAssociation The object containing the user and the badge that ill be associated.
     * @return The status result.
     */
    @RestSecurity(PrivilegeEnum.ADMV)
    @PostMapping("/badge/associate")
    public KommunicatorDto linkBadgeToUser(@RequestBody @Valid BadgeUserAssociationDto badgeUserAssociation,
                                           BindingResult result) {
        // Checking if there is validation error.
        errorHandler.handleValidationErrors(result);
        // Linking the badge to the user.
        badgeService.associateBadgeToUser(badgeUserAssociation.getUserId(), badgeUserAssociation.getBadgeId());
        // Sending a ok response.
        return kommunicatorService.buildSuccessKom("admin.badge.success.link.title",
                "admin.badge.success.link.message");
    }
}
