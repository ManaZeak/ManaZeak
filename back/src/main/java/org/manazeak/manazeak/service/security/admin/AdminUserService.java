package org.manazeak.manazeak.service.security.admin;

import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;

/**
 * This class is used to manipulate the users for the admin page.
 */
public interface AdminUserService {

    /**
     * Get all the user in a tree starting from JESUS.
     *
     * @return the tree containing all the users.
     */
    UserHierarchyDto getUserHierarchy();
}
