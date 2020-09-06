package org.manazeak.manazeak.service.security.admin;

import org.manazeak.manazeak.entity.dto.admin.UserHierarchyDto;
import org.manazeak.manazeak.entity.dto.admin.UserListLineDto;

import java.util.List;

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

    /**
     * Get all the users for displaying them in a list.
     *
     * @return The list of users.
     */
    List<UserListLineDto> getUserList();
}
