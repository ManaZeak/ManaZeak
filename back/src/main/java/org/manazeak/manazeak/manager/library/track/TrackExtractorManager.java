package org.manazeak.manazeak.manager.library.track;

import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * Import the track into the database
 */
@Component
public class TrackExtractorManager {

    private static final Logger LOG = LoggerFactory.getLogger(TrackExtractorManager.class);

    /**
     * Extracts the data contained in the track into an object.
     *
     * @param artists The list of folder to extract.
     * @return The list of extracted bands contained in the library.
     */
    public List<ExtractedBandDto> extractTracks(List<ScannedArtistDto> artists) {
        // Creating the thread pool.
        ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.LIBRARY_SCAN_THREAD_NUMBER);
        List<Future<ExtractedBandDto>> results = new ArrayList<>();
        // Launching the thread with an artist.
        for (ScannedArtistDto artist : artists) {
            results.add(executor.submit(new ArtistFolderExtractor(artist)));
        }

        // The pool doesn't accept any more jobs.
        executor.shutdown();

        List<ExtractedBandDto> bands = new ArrayList<>();
        // Getting the results of the threads.
        for (Future<ExtractedBandDto> result : results) {
            try {
                bands.add(result.get());
            } catch (ExecutionException e) {
                LOG.error("An exeption occured during the extraction of an artist. Skipping the artist folder.", e);
            } catch (InterruptedException e) {
                LOG.error("Track extraction thread was interrupted.", e);
                Thread.currentThread().interrupt();
            }
        }

        return bands;
    }
}
