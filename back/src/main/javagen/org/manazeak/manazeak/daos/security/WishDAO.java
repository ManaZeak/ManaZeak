package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.data.repository.CrudRepository;
import org.manazeak.manazeak.entity.security.Wish;

import java.util.List;

/**
 * Data Access Object for Wish using Spring CrudRepository interface
 *
 * This file has been automatically generated
 */
public interface WishDAO extends CrudRepository<Wish,  Long> {

    /**
     * Get all the wishes for a user sorted by content type in a descendant order.
     * @return The wishes of the user.
     */
    List<Wish> getAllByMzkUserOrderByWishStatusDesc(MzkUser user);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT