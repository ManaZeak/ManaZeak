package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Wish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Data Access Object for Wish using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface WishDAO extends JpaRepository<Wish, Long> {

    /**
     * Get all the wishes for a user sorted by content type in a descendant order.
     *
     * @param user The user possessing the wishes.
     * @return The wishes of the user.
     */
    List<Wish> getAllByMzkUserOrderByWishStatusDesc(MzkUser user);

    /**
     * Delete a wish in the database.
     *
     * @param wishId The wish id to delete
     * @param user   The user that is associated with this wish.
     * @return The wishes that has been deleted.
     */
    int removeByWishIdAndMzkUser(Long wishId, MzkUser user);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT