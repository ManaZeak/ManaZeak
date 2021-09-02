package org.manazeak.manazeak.manager.track;

import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Import the track into the database
 */
@Component
public class TrackExtractorManager {



    /**
     * Extracts the data contained in the track into an object.
     *
     * @param artists The list of folder to extract.
     */
    public void extractTracks(List<ScannedArtistDto> artists) {
        // Creating the thread pool.
        ExecutorService executor = Executors.newFixedThreadPool(10);

        // Launching the thread with an artist.
        for (ScannedArtistDto artist : artists) {

        }
    }

}
