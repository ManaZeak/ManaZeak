package org.manazeak.manazeak.service.library;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import org.manazeak.manazeak.manager.library.track.TrackManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * This service allows scanning the music library to get the information contained in the tracks.
 */
@Service
@Slf4j
@TransactionalWithRollback
@RequiredArgsConstructor
public class LibraryScanService {

    private final LibraryScanManager libraryScanManager;
    private final LibraryIntegrationManager libraryIntegrationManager;
    private final RandomInitializationManager randomInitializationManager;
    private final ThumbnailManager thumbnailManager;
    private final LibraryScanStatusManager libraryScanStatusManager;
    private final LibraryWiperDAO libraryWiperDAO;
    private final TrackManager trackManager;

    /**
     * Cleaning all the data contained in the library and importing all the tracks.
     */
    @CacheEvict({"all_artists_view", "detail_genre_view"}) // The library is rescanned, cleaning the caches.
    @Async
    public void scanLibrary() {
        log.info("Starting the library scan.");
        // Starting the library scan.
        libraryScanStatusManager.startScan(false);
        try {
            libraryScanStatusManager.setCurrentStep(ScanStepEnum.CLEARING_LIBRARY);
            // Cleaning the existing data.
            libraryWiperDAO.wipeLibraryData();

            // Scanning the library and collecting the results.
            LibraryScanResultDto scanResult = scanLibraryFolder();

            libraryScanStatusManager.setNumberTrackScanned(scanResult.getTotalScannedTracks());
            log.info("There is {} track to scan.", scanResult.getTotalScannedTracks());

            // Launch the integration of the library track scanned
            launchIntegration(scanResult);

            // TODO : read the additional files containing information not present in the track tags.

            libraryScanStatusManager.setCurrentStep(ScanStepEnum.DONE);
        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the scan", e);
        } finally {
            libraryScanStatusManager.endLibraryScan();
        }
    }

    /**
     * Keep all the track contained in the database a do an incremental update.
     */
    public void rescanLibrary() {
        log.info("Starting the library rescan.");
        // Starting the library scan.
        libraryScanStatusManager.startScan(true);
        try {
            LibraryScanResultDto scanResult = scanLibraryFolder();

            log.info("There is {} track in the file system.", scanResult.getTotalScannedTracks());

            log.info("Starting filtering not modified tracks.");
            List<String> deletedTracks = libraryScanManager.removeArtistNotUpdated(scanResult);
            log.info("Ended the filtering of not modified tracks.");

            libraryScanStatusManager.setNumberTrackScanned(scanResult.getTotalScannedTracks());
            log.info("There is {} track to update or insert in the database.", scanResult.getTotalScannedTracks());

            // Removing the tracks in the database.
            trackManager.removeTracks(deletedTracks);

            // Launch the integration of the library track scanned
            launchIntegration(scanResult);

        } catch (IOException e) {
            throw new MzkRuntimeException("File handling error during the rescan", e);
        } finally {
            libraryScanStatusManager.endLibraryScan();
        }
    }

    /**
     * Launch the library track integration.
     *
     * @param scanResult The track to insert / update in the library.
     */
    private void launchIntegration(LibraryScanResultDto scanResult) {
        log.info("Starting the tracks integration.");
        libraryScanStatusManager.setCurrentStep(ScanStepEnum.INTEGRATION);
        // Extract the data contained in the tags of the tracks.
        libraryIntegrationManager.integrateScannedLibrary(scanResult.getArtists());
        log.info("Ending the track integration.");

        log.info("Starting the thumbnails extraction.");
        // Generating the thumbnail.
        thumbnailManager.launchThumbnailGenerationDuringScan();
        log.info("Ending the thumbnails extraction.");

        // Init the random tables.
        randomInitializationManager.initRandomTables();
    }

    /**
     * Launch the scan in the file system of the tracks.
     *
     * @return The tracks contained in the file system.
     * @throws IOException Error while reading the file system.
     */
    private LibraryScanResultDto scanLibraryFolder() throws IOException {
        // Scanning the library and collecting the results.
        log.info("Starting the library FS scan.");
        libraryScanStatusManager.setCurrentStep(ScanStepEnum.ENUMERATING_FILES);
        LibraryScanResultDto scanResult = libraryScanManager.scanLibraryFolder();
        log.info("Ended the library FS scan.");

        return scanResult;
    }
}
