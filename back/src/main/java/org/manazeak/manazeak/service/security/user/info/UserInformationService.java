package org.manazeak.manazeak.service.security.user.info;

import org.manazeak.manazeak.entity.dto.user.MzkUserDetailProjection;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;

/**
 * This service is used to manipulate the information about a user.
 */
public interface UserInformationService {

    /**
     * Get the information about the current user.
     *
     * @return The current user information.
     */
    MzkUserDetailProjection getCurrentUserInformation();

    /**
     * Get the editable information about the current user.
     *
     * @return The current user information.
     */
    MzkUserEditDto getUserEditableInformation();

    /**
     * Saves the information of the edited user.
     * @param mzkUserEditDto The information
     */
    void saveCurrentUserEditInformation(MzkUserEditDto mzkUserEditDto);
}
