package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.entity.security.Wish;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Wish using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface WishDAO extends CrudRepository<Wish, Long> {

    /**
     * Get all the wishes for a user sorted by content type in a descendant order.
     *
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
    Optional<Wish> removeByWishIdAndMzkUser(Long wishId, MzkUser user);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT