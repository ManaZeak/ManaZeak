package org.manazeak.manazeak.service.library;

import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.entity.dto.library.scan.LibraryScanResultDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.LibraryScanManager;
import org.manazeak.manazeak.manager.library.cover.CoverManager;
import org.manazeak.manazeak.manager.library.track.TrackExtractorManager;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * This service allows to scan the music library to get the information contained in the tracks.
 */
@TransactionalWithRollback
@Service
public class LibraryScanService {

    private final LibraryScanManager libraryScanManager;

    private final TrackExtractorManager trackExtractor;

    private final CoverManager coverManager;

    public LibraryScanService(LibraryScanManager libraryScanManager, TrackExtractorManager trackExtractor,
                              CoverManager coverManager) {
        this.libraryScanManager = libraryScanManager;
        this.trackExtractor = trackExtractor;
        this.coverManager = coverManager;
    }

    /**
     * Cleaning all the data contained in the library and importing all the tracks.
     */
    @Async
    public void scanLibrary() {
        try {
            // Cleaning the existing data.
            // TODO: clean the database.
            // Scan result
            LibraryScanResultDto scanResult = libraryScanManager.scanLibraryFolder();
            // Extract the data contained in the tags of the tracks.
            trackExtractor.extractTracks(scanResult.getArtists());
            // Extracting the covers
            coverManager.launchCoverThumbnailGeneration(scanResult.getCoverPaths());
            // Inserting the tracks into the database.

        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the scan", e);
        }

    }

    /**
     * Sync the tracks contained in the filesystem with the track contained in the database.
     */
    public void rescanLibrary() {
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
