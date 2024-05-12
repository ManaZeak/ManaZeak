package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Data Access Object for Privilege using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface PrivilegeDAO extends JpaRepository<Privilege, Long> {

    /**
     * Getting all the privileges of a user.
     *
     * @param username the username of the user.
     * @return The list of privilege of the user.
     */
    @Query("""
            select listPrivileges
            from MzkUser as u
            inner join u.role as role
            inner join role.privilegeList as listPrivileges
            where u.username = :username
            """)
    List<Privilege> getPrivilegesByUsername(@Param("username") String username);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT