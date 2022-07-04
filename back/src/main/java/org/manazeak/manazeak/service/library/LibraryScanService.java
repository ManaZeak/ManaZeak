package org.manazeak.manazeak.service.library;

import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.LibraryScanResultDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.LibraryIntegrationManager;
import org.manazeak.manazeak.manager.library.LibraryScanManager;
import org.manazeak.manazeak.manager.library.LibraryWiperManager;
import org.manazeak.manazeak.manager.library.cover.CoverManager;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistProfilePicManager;
import org.manazeak.manazeak.manager.library.track.TrackExtractorManager;
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
@TransactionalWithRollback
@Service
public class LibraryScanService {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryScanService.class);
    private final LibraryScanManager libraryScanManager;
    private final TrackExtractorManager trackExtractor;
    private final LibraryWiperManager libraryWiper;
    private final LibraryIntegrationManager libraryIntegrationManager;
    private final CoverManager coverManager;
    private final ArtistProfilePicManager artistProfilePicManager;

    public LibraryScanService(LibraryScanManager libraryScanManager, TrackExtractorManager trackExtractor,
                              LibraryWiperManager libraryWiper, LibraryIntegrationManager libraryIntegrationManager,
                              CoverManager coverManager, ArtistProfilePicManager artistProfilePicManager) {
        this.libraryScanManager = libraryScanManager;
        this.trackExtractor = trackExtractor;
        this.libraryWiper = libraryWiper;
        this.libraryIntegrationManager = libraryIntegrationManager;
        this.coverManager = coverManager;
        this.artistProfilePicManager = artistProfilePicManager;
    }

    /**
     * Cleaning all the data contained in the library and importing all the tracks.
     */
    @Async
    public void scanLibrary() {
        LOG.info("Starting the library scan.");
        try {
            // Cleaning the existing data.
            libraryWiper.wipeLibraryData();

            // Scanning the library and collecting the results.
            LOG.info("Starting the library FS scan.");
            LibraryScanResultDto scanResult = libraryScanManager.scanLibraryFolder();
            LOG.info("Ended the library FS scan.");

            LOG.info("Starting the track tag extraction.");
            // Extract the data contained in the tags of the tracks.
            List<ExtractedBandDto> extractedBands = trackExtractor.extractTracks(scanResult.getArtists());
            LOG.info("Ending the track tag extraction.");

            LOG.info("Starting the cover extraction.");
            // Extracting the covers
            coverManager.launchCoverThumbnailGeneration(scanResult.getCoverPaths());
            LOG.info("Ending the cover extraction.");

            LOG.info("Starting the artist profile pictures thumbnail generation");
            // Generating the artists thumbnails.
            ExecutorService artistProfilePicExecutor = artistProfilePicManager.generateArtistProfileThumb();

            LOG.info("Starting the track integration.");
            // Inserting the tracks into the database.
            libraryIntegrationManager.insertLibraryData(extractedBands);
            LOG.info("Ending the track integration.");

            // TODO : read the additional files containing information not present in the track tags.

            LOG.info("Waiting for the artist profile pic extraction to be finished.");
            artistProfilePicExecutor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS);
            LOG.info("Ending artist profile picture thumbnail generation.");

        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the scan", e);
        } catch (InterruptedException e) {
            LOG.warn("The thread was interrupted.", e);
            Thread.currentThread().interrupt();
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
            trackExtractor.extractTracks(artists);
        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the rescan", e);
        }
    }

}
