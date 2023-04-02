package org.manazeak.manazeak.daos.management;

import org.manazeak.manazeak.entity.management.ThumbnailError;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * Data Access Object for ThumbnailError using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface ThumbnailErrorDAO extends CrudRepository<ThumbnailError, Long> {

    /**
     * Pass the status of a thumbnail error to processed.
     *
     * @param thumbErrorId The id of the thumbnail to update.
     */
    @Modifying
    @Query("update ThumbnailError set processed = true where thumbErrId = :thumbErrorId")
    void updateThumbnailErrorStatusById(@Param("thumbErrorId") Long thumbErrorId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT