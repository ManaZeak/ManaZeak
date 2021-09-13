package org.manazeak.manazeak.manager.track;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;

import java.util.List;

/**
 * This class allows to make some verification to the extracted data from the tags.
 */
public class TrackExtractorVerifHelper {

    public static String ARTIST_NAME_1 = "artist 1";

    public static String ARTIST_NAME_2 = "artist 2";

    private TrackExtractorVerifHelper() {

    }

    /**
     * Check the extracted bands from the tracks tags.
     */
    public static void checkExtractedBands(List<ExtractedBandDto> bands) {
        // Checking the number of extracted bands.
        Assertions.assertEquals(2, bands.size(), "Wrong number of extracted bands.");
        // Checking the name of the extracted bands
        Assertions.assertNotEquals(bands.get(0), bands.get(1), "Wrong band name extracted.");
        ExtractedBandDto band1 = bands.get(0);
        ExtractedBandDto band2 = bands.get(1);

    }

    private void checkArtistNameIsCorrect(String artistName) {
        if (!artistName.equals("artist 1") && !artistName.equals("artist 2")) {
            Assertions.fail("The artist doesn't have a expected name : " + artistName);
        }
    }

}
