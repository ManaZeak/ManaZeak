package org.manazeak.manazeak.service.library;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.library.ScanStepEnum;
import org.manazeak.manazeak.daos.library.wiper.LibraryWiperDAO;
import org.manazeak.manazeak.entity.dto.library.scan.LibraryScanResultDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.LibraryScanManager;
import org.manazeak.manazeak.manager.library.integration.LibraryIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.random.RandomInitializationManager;
import org.manazeak.manazeak.manager.library.status.LibraryScanStatusManager;
import org.manazeak.manazeak.manager.library.thumbnail.ThumbnailManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * This service allows to scan the music library to get the information contained in the tracks.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class LibraryScanService {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryScanService.class);
    private final LibraryScanManager libraryScanManager;
    private final LibraryIntegrationManager libraryIntegrationManager;
    private final RandomInitializationManager randomInitializationManager;
    private final ThumbnailManager thumbnailManager;
    private final LibraryScanStatusManager libraryScanStatusManager;
    private final LibraryWiperDAO libraryWiperDAO;

    /**
     * Cleaning all the data contained in the library and importing all the tracks.
     */
    @Async
    public void scanLibrary() {
        LOG.info("Starting the library scan.");
        // Starting the library scan.
        libraryScanStatusManager.startScan(false);
        try {
            libraryScanStatusManager.setCurrentStep(ScanStepEnum.CLEARING_LIBRARY);
            // Cleaning the existing data.
            libraryWiperDAO.wipeLibraryData();

            // Scanning the library and collecting the results.
            LOG.info("Starting the library FS scan.");
            libraryScanStatusManager.setCurrentStep(ScanStepEnum.ENUMERATING_FILES);
            LibraryScanResultDto scanResult = libraryScanManager.scanLibraryFolder();
            LOG.info("Ended the library FS scan.");

            libraryScanStatusManager.setNumberTrackScanned(scanResult.getTotalScannedTracks());
            LOG.info("There is {} track to scan.", scanResult.getTotalScannedTracks());

            LOG.info("Starting the tracks integration.");
            libraryScanStatusManager.setCurrentStep(ScanStepEnum.INTEGRATION);
            // Extract the data contained in the tags of the tracks.
            libraryIntegrationManager.integrateScannedLibrary(scanResult.getArtists());
            LOG.info("Ending the track integration.");

            LOG.info("Starting the thumbnails extraction.");
            // Generating the thumbnail.
            thumbnailManager.launchThumbnailGenerationDuringScan();
            LOG.info("Ending the thumbnails extraction.");

            // Init the random tables.
            randomInitializationManager.initRandomTables();

            // TODO : read the additional files containing information not present in the track tags.

            libraryScanStatusManager.setCurrentStep(ScanStepEnum.DONE);
        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the scan", e);
        } finally {
            libraryScanStatusManager.endLibraryScan();
        }

    }
}
