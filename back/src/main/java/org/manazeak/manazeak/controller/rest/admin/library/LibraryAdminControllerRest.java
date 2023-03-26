package org.manazeak.manazeak.controller.rest.admin.library;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.service.library.LibraryScanService;
import org.manazeak.manazeak.service.library.thumb.ThumbnailService;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Interacts with the library.
 */
@RestController
@RequiredArgsConstructor
public class LibraryAdminControllerRest {

    private final KommunicatorService kommunicatorService;

    private final LibraryScanService libraryScanService;

    private final ThumbnailService thumbnailService;

    /**
     * Scan the library and wipe the old data of the library.
     */
    @Security(PrivilegeEnum.ADMV)
    @GetMapping("admin/library/scan/")
    public KommunicatorDto launchLibraryScan() {
        // Launching the library scan, this is async, the response will be sent directly.
        libraryScanService.scanLibrary();
        return kommunicatorService.buildSuccessKom("admin.library.scan.success.title", "admin.library.scan.success.message");
    }

    /**
     * Remove and generate the thumbnails of the resources of the application.
     *
     * @return A success message.
     */
    @Security(PrivilegeEnum.ADMV)
    @GetMapping("admin/library/regenThumbs/")
    public KommunicatorDto launchThumbRegeneration() {
        // Launching the thumbnails' generation, this is async, the response will be sent directly.
        thumbnailService.regenerateThumbs();
        return kommunicatorService.buildSuccessKom("admin.library.cover.rescan.success.title", "admin.library.cover.rescan.success.message");
    }
}
