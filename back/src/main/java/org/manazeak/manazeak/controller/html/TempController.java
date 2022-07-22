package org.manazeak.manazeak.controller.html;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.service.library.LibraryScanService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller is used for testing the app for the front.
 */
@Controller
public class TempController {

    private final LibraryScanService scanService;

    public TempController(LibraryScanService scanService) {
        this.scanService = scanService;
    }

    /**
     * Loading the template for the main page.
     *
     * @return the main page to the user.
     */
    @GetMapping("/testPriv")
    @Security(PrivilegeEnum.ADMV)
    public String getMainPage() {
        // Test intégration bibliothèque
        scanService.scanLibrary();
        return "index.html";
    }
}
