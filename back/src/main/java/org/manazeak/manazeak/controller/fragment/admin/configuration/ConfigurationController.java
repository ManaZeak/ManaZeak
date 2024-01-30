package org.manazeak.manazeak.controller.fragment.admin.configuration;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.manazeak.manazeak.service.management.ConfigurationService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Handles the configuration manipulation in the application.
 */
@FragmentController
@RequiredArgsConstructor
public class ConfigurationController {


    private final ConfigurationService configurationService;

    /**
     * Get the configuration page. This fragment displays all the confguration keys of the application.
     *
     * @return The location of the fragment to fill.
     */
    @Security(PrivilegeEnum.ADMV)
    @GetMapping("/admin/config/")
    public String getConfigPage(Model model) {
        // Get all the configuration keys of the application.
        model.addAttribute("configs", configurationService.getAllConfigurations());
        // Returning the fragment to send to the front.
        return AdminFragmentEnum.CONFIGS.getPage();
    }

}
