package org.manazeak.manazeak.daos.computation;

import org.manazeak.manazeak.entity.computation.ScanStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Data Access Object for ScanStatus using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface ScanStatusDAO extends CrudRepository<ScanStatus, Long> {

    /**
     * Get the active scan status.
     *
     * @return The scan status if there is one active.
     */
    Optional<ScanStatus> findScanStatusByIsActiveIsTrue();

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT