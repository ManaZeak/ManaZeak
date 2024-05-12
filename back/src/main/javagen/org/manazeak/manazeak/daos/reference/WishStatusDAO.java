package org.manazeak.manazeak.daos.reference;

import org.manazeak.manazeak.entity.reference.WishStatus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Data Access Object for WishStatus using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface WishStatusDAO extends JpaRepository<WishStatus, Long> {

    WishStatus getWishStatusByWishStatusId(Long wishStatusId);


}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT