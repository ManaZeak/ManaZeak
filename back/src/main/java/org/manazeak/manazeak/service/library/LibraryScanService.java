package org.manazeak.manazeak.service.library;

import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.library.ScanStepEnum;
import org.manazeak.manazeak.entity.dto.library.scan.LibraryScanResultDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.LibraryScanManager;
import org.manazeak.manazeak.manager.library.LibraryWiperManager;
import org.manazeak.manazeak.manager.library.cover.CoverManager;
import org.manazeak.manazeak.manager.library.integration.LibraryIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistProfilePicManager;
import org.manazeak.manazeak.manager.library.status.LibraryScanStatusManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * This service allows to scan the music library to get the information contained in the tracks.
 */
@Service
@TransactionalWithRollback
public class LibraryScanService {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryScanService.class);
    private final LibraryScanManager libraryScanManager;
    private final LibraryIntegrationManager libraryIntegrationManager;
    private final LibraryWiperManager libraryWiper;
    private final CoverManager coverManager;
    private final ArtistProfilePicManager artistProfilePicManager;

    private final LibraryScanStatusManager libraryScanStatusManager;

    public LibraryScanService(LibraryScanManager libraryScanManager, LibraryIntegrationManager libraryIntegrationManager,
                              LibraryWiperManager libraryWiper, CoverManager coverManager,
                              ArtistProfilePicManager artistProfilePicManager, LibraryScanStatusManager libraryScanStatusManager) {
        this.libraryScanManager = libraryScanManager;
        this.libraryIntegrationManager = libraryIntegrationManager;
        this.libraryWiper = libraryWiper;
        this.coverManager = coverManager;
        this.artistProfilePicManager = artistProfilePicManager;
        this.libraryScanStatusManager = libraryScanStatusManager;
    }

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
            libraryWiper.wipeLibraryData();

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

            LOG.info("Starting the cover extraction.");
            // Extracting the covers
            libraryScanStatusManager.setCurrentStep(ScanStepEnum.TRACK_COVER_EXTRACTION);
            coverManager.launchCoverThumbnailGeneration(scanResult.getCoverPaths());
            LOG.info("Ending the cover extraction.");

            LOG.info("Starting the artist profile pictures thumbnail generation");
            // Generating the artists thumbnails.
            libraryScanStatusManager.setCurrentStep(ScanStepEnum.ARTIST_PICTURE_EXTRACTION);
            ExecutorService artistProfilePicExecutor = artistProfilePicManager.generateArtistProfileThumb();

            // TODO : read the additional files containing information not present in the track tags.

            LOG.info("Waiting for the artist profile pic extraction to be finished.");
            artistProfilePicExecutor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS);
            LOG.info("Ending artist profile picture thumbnail generation.");

            libraryScanStatusManager.setCurrentStep(ScanStepEnum.DONE);
        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the scan", e);
        } catch (InterruptedException e) {
            LOG.warn("The thread was interrupted.", e);
            Thread.currentThread().interrupt();
        } finally {
            libraryScanStatusManager.endLibraryScan();
        }

    }

    /**
     * Sync the tracks contained in the filesystem with the track contained in the database.
     */
    public void rescanLibrary() {
        LOG.info("Starting the library re-scan.");
        // Iterating through the files of the library.
        try {
            // Scan result
            LibraryScanResultDto scanResult = libraryScanManager.scanLibraryFolder();
            // Filtering the artists that must be updated.
            List<ScannedArtistDto> artists = libraryScanManager.removeArtistNotUpdated(scanResult.getArtists());
            // Extract the data contained in the tags of the tracks.
        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the rescan", e);
        }
    }

}
