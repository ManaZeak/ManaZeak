package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.Role;
import org.springframework.data.repository.CrudRepository;

/**
 * Data Access Object for Role using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface RoleDAO extends CrudRepository<Role, Long> {

    /**
     * Get a role by it's id.
     *
     * @param id The id of the role.
     * @return the role.
     */
    Role getRoleByRoleId(Long id);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT