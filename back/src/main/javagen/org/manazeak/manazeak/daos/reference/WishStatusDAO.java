package org.manazeak.manazeak.daos.reference;

import org.springframework.data.repository.CrudRepository;
import org.manazeak.manazeak.entity.reference.WishStatus;

/**
 * Data Access Object for WishStatus using Spring CrudRepository interface
 *
 * This file has been automatically generated
 */
public interface WishStatusDAO extends CrudRepository<WishStatus,  Long> {

    WishStatus getWishStatusByWishStatusId(Long wishStatusId);


}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT