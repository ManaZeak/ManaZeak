package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.WishStatus;
import org.springframework.data.repository.CrudRepository;

/**
 * Data Access Object for WishStatus using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface WishStatusDAO extends CrudRepository<WishStatus, Long> {

    WishStatus getWishStatusByWishStatusId(Long wishStatusId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT