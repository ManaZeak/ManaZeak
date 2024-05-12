package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Data Access Object for Badge using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface BadgeDAO extends JpaRepository<Badge, Long> {

    /**
     * Get the badges in the application.
     *
     * @return get all the badges of the application.
     */
    @Query("SELECT DISTINCT b from Badge b LEFT JOIN FETCH b.mzkUserList")
    List<Badge> getAllBadges();


}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT