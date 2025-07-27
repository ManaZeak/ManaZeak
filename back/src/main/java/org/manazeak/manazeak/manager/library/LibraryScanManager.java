package org.manazeak.manazeak.manager.library;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.dto.library.scan.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Permit the scan of the music library.
 */
@Component
@RequiredArgsConstructor
public class LibraryScanManager {

    private final TrackDAO trackDAO;

    /**
     * Scan the library folder to find the tracks of the library.
     *
     * @return The list of scanned artists.
     * @throws IOException Error during the walk.
     */
    public LibraryScanResultDto scanLibraryFolder() throws IOException {
        // The path of the music library that will be scanned.
        Path libPath = LibraryConstant.LIBRARY_PATH;
        // Creating the FileVisitor that will collect the tracks.
        AudioFileVisitor visitor = new AudioFileVisitor();
        // Launch the file walk.
        Files.walkFileTree(libPath, visitor);
        // Getting the scanned artist.
        return new LibraryScanResultDto(visitor.getArtists(), visitor.getCoverPaths(), visitor.getTotalScannedTrack());
    }

    /**
     * Remove all the tracks not updated after the last scan / rescan
     *
     * @param libraryScanResult The result of the initial filesystem scan.
     */
    public List<String> removeArtistNotUpdated(LibraryScanResultDto libraryScanResult) {
        int trackToProcess = 0;
        List<String> deletedTracks = new ArrayList<>();
        for (Iterator<ScannedArtistDto> artistIterator = libraryScanResult.getArtists().iterator(); artistIterator.hasNext(); ) {
            ScannedArtistDto scannedArtist = artistIterator.next();
            // Fetching all the track of the scannedArtist.
            Map<String, LocalDateTime> artistTrackLastModifiedDate = loadLastModifiedDateForArtist(scannedArtist.getArtistPath().toString());

            // Get all the location of the tracks not existing anymore in the database.
            deletedTracks.addAll(getDeleteTrackPath(artistTrackLastModifiedDate.keySet(), scannedArtist));

            for (Iterator<ScannedAlbumDto> albumIterator = scannedArtist.getAlbums().iterator(); albumIterator.hasNext(); ) {
                ScannedAlbumDto scannedAlbum = albumIterator.next();

                for (Iterator<ScannedTrackDto> trackIterator = scannedAlbum.getTracks().iterator(); trackIterator.hasNext(); ) {
                    ScannedTrackDto track = trackIterator.next();
                    // Comparing the last modified date of the track on the file system and in the database.
                    LocalDateTime lastModifiedDateDbDate = artistTrackLastModifiedDate.get(track.getTrackPath().toString());
                    if (lastModifiedDateDbDate != null && !track.getLastModificationDate().isAfter(lastModifiedDateDbDate)) {
                        trackIterator.remove();
                    } else {
                        trackToProcess++;
                    }

                }

                // Removing the album if no tracks are present inside.
                if (scannedAlbum.getTracks().isEmpty()) {
                    albumIterator.remove();
                }
            }

            // Removing the artist if no albums are associated with this artist.
            if (scannedArtist.getAlbums().isEmpty()) {
                artistIterator.remove();
            }
        }
        // Updating the number of tracks to be updated by the scan.
        libraryScanResult.setTotalScannedTracks(trackToProcess);
        return deletedTracks;
    }

    private List<String> getDeleteTrackPath(Set<String> databaseTrackLocation, ScannedArtistDto scannedArtist) {
        List<String> deletedTracks = new ArrayList<>();
        Set<String> scannedTracks = new HashSet<>();
        for (ScannedAlbumDto album : scannedArtist.getAlbums()) {
            for (ScannedTrackDto track : album.getTracks()) {
                scannedTracks.add(track.getTrackPath().toString());
            }
        }

        for (String location : databaseTrackLocation) {
            if (!scannedTracks.contains(location)) {
                deletedTracks.add(location);
            }
        }

        return deletedTracks;
    }

    /**
     * @return The map containing the last modified date for a track location.
     */
    private Map<String, LocalDateTime> loadLastModifiedDateForArtist(@NonNull String artistPath) {
        List<TrackLastModifiedDto> artistTracks = trackDAO.getTrackPathStartWith(artistPath);
        Map<String, LocalDateTime> locationLastModified = new HashMap<>();
        for (TrackLastModifiedDto trackLastModified : artistTracks) {
            locationLastModified.put(trackLastModified.trackPath(), trackLastModified.lastModified());
        }

        return locationLastModified;
    }
}
