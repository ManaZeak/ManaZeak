package org.manazeak.manazeak.daos.computation;

import org.manazeak.manazeak.entity.computation.ScanStatus;
import org.manazeak.manazeak.entity.dto.library.scan.ScanStatusDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * Data Access Object for ScanStatus using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface ScanStatusDAO extends JpaRepository<ScanStatus, Long> {

    /**
     * Get the active scan status.
     *
     * @return The scan status if there is one active.
     */
    Optional<ScanStatus> findScanStatusByIsActiveIsTrue();

    /**
     * Get the current scan status.
     *
     * @return An optional containing the scan status found.
     */
    @Query("""
            select new org.manazeak.manazeak.entity.dto.library.scan.ScanStatusDto(
                step.code,
                step.scanStepId,
                st.startTime
            ) from ScanStatus st
            join st.scanStep step
            where st.isActive
            """)
    ScanStatusDto getCurrentScanStatus();

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT