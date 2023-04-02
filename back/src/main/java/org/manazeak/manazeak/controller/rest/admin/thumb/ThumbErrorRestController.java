package org.manazeak.manazeak.controller.rest.admin.thumb;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.service.library.thumb.ThumbnailService;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Allows to interact with the thumbnails error in the application.
 */
@RestController
@RequiredArgsConstructor
public class ThumbErrorRestController {

    private final ThumbnailService thumbnailService;

    private final KommunicatorService kommunicatorService;

    /**
     * Mark a thumbnail error as processed in the database.
     *
     * @param thumbErrorId The id of the thumbnail error.
     * @return A success message.
     */
    @Security(PrivilegeEnum.ADMV)
    @PostMapping("/admin/thumb/{thumbErrorId}/processed/")
    public KommunicatorDto markThumbnailErrorProcessed(@PathVariable Long thumbErrorId) {
        thumbnailService.setThumbErrorToProcessed(thumbErrorId);

        return kommunicatorService.buildSuccessKom("admin.thumb.processed_title", "admin.thumb.processed_message");
    }

}
