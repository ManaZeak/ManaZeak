package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.entity.dto.user.MzkUserDetailProjection;

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
}
