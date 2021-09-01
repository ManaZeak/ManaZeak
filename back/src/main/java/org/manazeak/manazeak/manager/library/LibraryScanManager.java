package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.daos.track.BandDAO;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.entity.track.Band;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

/**
 * Permit the scan of the music library.
 */
@Component
public class LibraryScanManager {

    private final BandDAO bandDAO;

    public LibraryScanManager(BandDAO bandDAO) {
        this.bandDAO = bandDAO;
    }

    /**
     * Scan the library folder to find the tracks of the library.
     *
     * @throws IOException Error during the walk.
     */
    public List<ScannedArtistDto> scanLibraryFolder() throws IOException {
        // The path of the music library that will be scanned.
        Path libPath = LibraryConstant.LIBRARY_PATH;
        // Creating the FileVisitor that will collect the tracks.
        AudioFileVisitor visitor = new AudioFileVisitor();
        // Launch the file walk.
        Files.walkFileTree(libPath, visitor);
        // Getting the scanned artist.
        return visitor.getArtists();
    }

    /**
     * Remove all the artists that are not updated for the rescan.
     *
     * @return The list of the artist to add or update into the library.
     */
    public List<ScannedArtistDto> removeArtistNotUpdated(List<ScannedArtistDto> artists) {
        // Creating the artist buffer.
        Map<String, ScannedArtistDto> artistBatch = new HashMap<>();
        // Creating the output list.
        List<ScannedArtistDto> artistsToUpdate = new ArrayList<>();
        // Iterating over the artists
        for (int i = 0; i < artists.size(); ++i) {
            artistBatch.put(artists.get(i).getArtistPath().toString(), artists.get(i));
        }
        return null;
    }

    /**
     * Getting the artist from the database and comparing
     *
     * @return
     */
    private List<ScannedArtistDto> compareWithDataBaseArtists(Map<String, ScannedArtistDto> artists) {
        // Getting the locations to get in the database
        Set<String> locations = artists.keySet();
        List<Band> bands = bandDAO.getBandByLocations(locations);
        // Creating the result list containing the artists that must be updated.
        List<ScannedArtistDto> artistsToUpdate = new ArrayList<>();
        for (int i = 0 ; i < bands.size(); ++i) {
            Band band = bands.get(i);
            ScannedArtistDto scannedArtist = artists.get(band.getLocation());
            // Checking if the last modification date of the artist.
            if (scannedArtist.getLastModificationDate().isAfter(band.getLastModificationDate())) {
                // The band must be updated
                artistsToUpdate.add(scannedArtist);
                // 
            }
        }
        return null;
    }
}
