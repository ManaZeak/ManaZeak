package org.manazeak.manazeak.manager.library.status;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.ScanStepEnum;
import org.manazeak.manazeak.daos.computation.ScanStatusDAO;
import org.manazeak.manazeak.daos.reference.ScanStepDAO;
import org.manazeak.manazeak.entity.computation.ScanStatus;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.database.transaction.AutonomousTransactionManager;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Allows to handle the status of the scan of the library.
 */
@Component
@RequiredArgsConstructor
public class LibraryScanStatusManager {

    private final ScanStatusDAO scanStatusDAO;

    private final ScanStepDAO scanStepDAO;

    private final AutonomousTransactionManager autonomousTransactionManager;

    /**
     * Check if another library isn't in the process of integration.
     */
    public void startScan(boolean isRescan) {
        // Check if another library is in the process of integration.
        checkNoActiveScan();
        autonomousTransactionManager.runInTransaction(() -> {
            ScanStatus scanStatus = new ScanStatus();
            scanStatus.setStartTime(LocalDateTime.now());
            scanStatus.setIsActive(true);
            scanStatus.setIsRescan(isRescan);

            // Inserting the scan status inside the database.
            scanStatusDAO.save(scanStatus);
        });
    }

    /**
     * Allows to change the actual step of the scan.
     *
     * @param step The new step.
     */
    public void setCurrentStep(ScanStepEnum step) {
        autonomousTransactionManager.runInTransaction(() -> {
            ScanStatus status = getActiveScanStatus();
            status.setScanStep(scanStepDAO.findById(step.getStepId())
                    .orElseThrow(() -> new MzkRuntimeException("The scan step doesn't exist in the database."))
            );

            scanStatusDAO.save(status);
        });
    }

    /**
     * Set the number of tracks that has been found on the FS to be analysed.
     *
     * @param numberTrackScanned The number of scanned tracks.
     */
    public void setNumberTrackScanned(int numberTrackScanned) {
        autonomousTransactionManager.runInTransaction(() -> {
            ScanStatus status = getActiveScanStatus();
            status.setTotalTrackScanned(numberTrackScanned);

            scanStatusDAO.save(status);
        });
    }

    /**
     * Set the library as not active and put the end time.
     */
    public void endLibraryScan() {
        autonomousTransactionManager.runInTransaction(() -> {
            ScanStatus status = getActiveScanStatus();
            status.setEndTime(LocalDateTime.now());
            status.setIsActive(false);

            scanStatusDAO.save(status);
        });
    }

    /**
     * Check if no scan is active in the application.
     */
    public void checkNoActiveScan() {
        Optional<ScanStatus> scanStatus = scanStatusDAO.findScanStatusByIsActiveIsTrue();
        if (scanStatus.isPresent()) {
            throw new MzkRuntimeException("Another scan is in progress. The scan/rescan you asked can't be processed.");
        }
    }

    /**
     * Check if another scan is in progress.
     */
    private ScanStatus getActiveScanStatus() {
        Optional<ScanStatus> scanStatus = scanStatusDAO.findScanStatusByIsActiveIsTrue();
        if (scanStatus.isEmpty()) {
            throw new MzkRuntimeException("No scan is in progress, the application is in a unstable state.");
        }
        return scanStatus.get();
    }

}
