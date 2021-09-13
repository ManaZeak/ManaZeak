package org.manazeak.manazeak.manager.track;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ScannedArtistDto;
import org.manazeak.manazeak.manager.library.LibraryScanManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.List;

/**
 * Test the extraction of the track containde in the library.
 */
class TrackExtractorManagerTest extends AbstractManaZeakTest {

    @Autowired
    private LibraryScanManager libraryScanManager;

    @Autowired
    private TrackExtractorManager trackExtractorManager;

    @Test
    void testExtractionLibrary() throws IOException {
        // Scanning the library files.
        List<ScannedArtistDto> scannedArtists = libraryScanManager.scanLibraryFolder();
        // Extracting the tags of the scanned artist.
        List<ExtractedBandDto> bands = trackExtractorManager.extractTracks(scannedArtists);

    }

}
