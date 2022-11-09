package org.manazeak.manazeak.controller.rest.admin.library;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.service.library.LibraryScanService;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Interacts with the library.
 */
@RestController
public class LibraryAdminControllerRest {

    private final KommunicatorService kommunicatorService;

    private final LibraryScanService libraryScanService;

    public LibraryAdminControllerRest(KommunicatorService kommunicatorService, LibraryScanService libraryScanService) {
        this.kommunicatorService = kommunicatorService;
        this.libraryScanService = libraryScanService;
    }


    /**
     * Scan the library and wipe the old data of the library.
     */
    @Security(PrivilegeEnum.ADMV)
    @GetMapping("admin/library/scan")
    public KommunicatorDto getMainPage() {
        // Test intégration bibliothèque
        libraryScanService.scanLibrary();
        return kommunicatorService.buildSuccessKom("admin.library.scan.success.title", "admin.library.scan.success.message");
    }
}
