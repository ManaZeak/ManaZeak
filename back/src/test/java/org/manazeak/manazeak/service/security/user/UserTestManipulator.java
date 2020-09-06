package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.manazeak.manazeak.service.security.user.info.AdditionalInfoManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This class is used to do some operation about the user directly for the unit tests.
 */
@Component
public class UserTestManipulator {

    @Autowired
    AdditionalInfoManager additionalInfoManager;

    /**
     * Allows to add a locale to the current user directly.
     */
    public void addLocaleToUser(Long localeId) {
        // Creating the additional info objet
        UserFirstInfoDto additionalInfo = new UserFirstInfoDto();
        additionalInfo.setLocaleId(localeId);
        // Saving it to the user.
        additionalInfoManager.addUserInformation(additionalInfo);
    }
}
