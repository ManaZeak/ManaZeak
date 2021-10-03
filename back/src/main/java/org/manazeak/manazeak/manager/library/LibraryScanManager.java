package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.daos.track.BandDAO;
import org.manazeak.manazeak.entity.dto.library.scan.LibraryScanResultDto;
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
        return new LibraryScanResultDto(visitor.getArtists(), visitor.getCoverPaths());
    }

    /**
     * Remove all the artists that are not updated for the rescan.
     *
     * @param artists The list of artists to filter.
     * @return The list of the artist to add or update into the library.
     */
    public List<ScannedArtistDto> removeArtistNotUpdated(List<ScannedArtistDto> artists) {
        // Creating the artist buffer.
        Map<String, ScannedArtistDto> artistBatch = new HashMap<>();
        // Creating the output list.
        List<ScannedArtistDto> artistsToUpdate = new ArrayList<>();
        int elementCounter = 0;

        // Iterating over the artists
        for (ScannedArtistDto artist : artists) {
            // Adding the scanned artist to the map.
            artistBatch.put(artist.getArtistPath().toString(), artist);
            elementCounter++;
            // If the buffer is full, requesting the database.
            if (elementCounter > LibraryConstant.SCAN_BUFFER_SIZE) {
                // Adding the artists to the exit list.
                artistsToUpdate.addAll(compareWithDataBaseArtists(artistBatch));
                // Clearing the map and resetting the counter
                elementCounter = 0;
                artistBatch.clear();
            }
        }

        // If there is any artist left in the buffer, we process them
        if (elementCounter != 0) {
            artistsToUpdate.addAll(compareWithDataBaseArtists(artistBatch));
        }

        return artistsToUpdate;
    }

    /**
     * Getting the artist from the database and comparing
     *
     * @param artists The map of artists linked to their location.
     * @return The list of the artists filtered.
     */
    private List<ScannedArtistDto> compareWithDataBaseArtists(Map<String, ScannedArtistDto> artists) {
        // Getting the location of the artists to get.
        Set<String> locations = artists.keySet();
        // Getting the locations to get in the database
        List<Band> bands = bandDAO.getBandByLocations(locations);

        // Creating the result list containing the artists that must be updated.
        List<ScannedArtistDto> artistsToUpdate = new ArrayList<>();
        for (Band band : bands) {
            ScannedArtistDto scannedArtist = artists.get(band.getLocation());
            // Checking if the last modification date of the artist.
            if (scannedArtist.getLastModificationDate().isAfter(band.getLastModificationDate())) {
                // The band must be updated
                artistsToUpdate.add(scannedArtist);
                // Removing from the band from the map
                artists.remove(band.getLocation());
            }
        }

        // The bands that still are in the map were not found in the database, we must add them.
        artistsToUpdate.addAll(artists.values());

        return artistsToUpdate;
    }
}
