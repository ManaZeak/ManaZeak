package org.manazeak.manazeak.controller.fragment.ui.scene.menupage;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.configuration.security.SecurityUtil;
import org.manazeak.manazeak.constant.library.ScanStepEnum;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.manazeak.manazeak.entity.reference.ScanStep;
import org.manazeak.manazeak.service.library.LibraryScanStatusService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Allows to display the main page to the users.
 */
@FragmentController
@RequiredArgsConstructor
public class MenuPageController {

    private final LibraryScanStatusService libraryScanStatusService;

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/menupage/")
    public String getMenuPage(Model model) {
        // Putting a boolean to display the admin page.
        model.addAttribute("isAdmin", SecurityUtil.currentUserHasPrivilege(PrivilegeEnum.ADMV));
        // Displaying the scan status of the library.
        model.addAttribute("scanStatus", libraryScanStatusService.getLibraryScanStatus());
        model.addAttribute("totalSteps", ScanStepEnum.values().length);
        return UiFragmentEnum.MENU_PAGE.getPage();
    }
}
