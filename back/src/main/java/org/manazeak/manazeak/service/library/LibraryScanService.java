package org.manazeak.manazeak.service.library;

import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.LibraryScanManager;
import org.manazeak.manazeak.manager.track.TrackExtractorManager;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * This service allows to scan the music library to get the information contained in the tracks.
 */
@Service
public class LibraryScanService {

    private final LibraryScanManager libraryScanManager;

    private final TrackExtractorManager trackExtractor;

    public LibraryScanService(LibraryScanManager libraryScanManager, TrackExtractorManager trackExtractor) {
        this.libraryScanManager = libraryScanManager;
        this.trackExtractor = trackExtractor;
    }

    /**
     * Cleaning all the data contained in the library and importing all the tracks.
     */
    @Async
    public void scanLibrary() {
        try {
            // Cleaning the existing data.
            // TODO: clean the database.
            // Getting the files from the filesystem.
            List<ScannedArtistDto> artists = libraryScanManager.scanLibraryFolder();
            // Extract the data contained in the tags of the tracks.
            trackExtractor.extractTracks(artists);
        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the scan", "", e);
        }

    }

    /**
     * Sync the tracks contained in the filesystem with the track contained in the database.
     */
    public void rescanLibrary() {
        // Iterating through the files of the library.
        try {
            List<ScannedArtistDto> artists = libraryScanManager.scanLibraryFolder();
            // Filtering the artists that must be updated.
            artists = libraryScanManager.removeArtistNotUpdated(artists);
            // Extract the data contained in the tags of the tracks.
            trackExtractor.extractTracks(artists);
        } catch (IOException e) {
            // TODO: save the error in a table to show it to a front user.
            throw new MzkRuntimeException("File handling error during the rescan", "", e);
        }
    }

}
