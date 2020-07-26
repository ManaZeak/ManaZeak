package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;

/**
 * This is used to link the user with all the additional information provided after the register.
 */
public interface AdditionalInfoManager {

    /**
     * This function add the additional information about the user after the creation.
     *
     * @param userInfo the user information to add to the user.
     */
    void addUserInformation(final UserFirstInfoDto userInfo);
}
