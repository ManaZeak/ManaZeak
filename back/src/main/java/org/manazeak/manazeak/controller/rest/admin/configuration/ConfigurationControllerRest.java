package org.manazeak.manazeak.controller.rest.admin.configuration;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.admin.configuration.ConfigurationDto;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.service.management.ConfigurationService;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles the configuration update.
 */
@RestController
@RequiredArgsConstructor
public class ConfigurationControllerRest {

    private final ConfigurationService configurationService;

    private final KommunicatorService kommunicatorService;

    /**
     * Change the value of a configuration value.
     *
     * @param configuration The information on the new configuration.
     * @return A success communicator.
     */
    @Security(PrivilegeEnum.ADMV)
    @PostMapping("/admin/config/")
    public KommunicatorDto changeProperty(@RequestBody ConfigurationDto configuration) {
        configurationService.setKey(configuration);
        return kommunicatorService.buildSuccessKom("admin.config.success.title", "admin.config.success.message");
    }

}
