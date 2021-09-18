package org.manazeak.manazeak.manager.track;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;

import java.util.List;

/**
 * This class allows to make some verification to the extracted data from the tags.
 */
public class TrackExtractorVerifHelper {

    public static String ARTIST_NAME_1 = "artist 1";

    public static String ARTIST_NAME_2 = "artist 2";

    public static String ALBUM_NAME = "Album ";


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
        // Check that the name of the artist is correct.
        checkArtistNameIsCorrect(band1.getName());
        checkArtistNameIsCorrect(band2.getName());
        // Check the information about the artist band.
        if (band1.getName().equals(ARTIST_NAME_1)) {
            Assertions.assertEquals(band1.getAlbums().size(), 2, "Invalid album size for the artist 1");
            Assertions.assertEquals(band2.getAlbums().size(), 2, "Invalid album size for the artist 2");
            checkExtractedAlbumsBand1(band1.getAlbums());
        } else {
            Assertions.assertEquals(band2.getAlbums().size(), 2, "Invalid album size for the artist 1");
            Assertions.assertEquals(band1.getAlbums().size(), 2, "Invalid album size for the artist 2");
        }
    }

    /**
     * Check the extracted albums from the tracks tags.
     *
     * @param albums The albums of the artist 1.
     */
    public static void checkExtractedAlbumsBand1(List<ExtractedAlbumDto> albums) {
        // Checking the number of albums.
        Assertions.assertEquals(2, albums.size(), "Wrong number of album found for the artist 1.");
        // Checking the album names.
        ExtractedAlbumDto album1 = albums.get(0);
        ExtractedAlbumDto album2 = albums.get(1);
        // Check the album name.
        Assertions.assertNotEquals(album1.getTitle(), album2.getTitle(), "The albums have the same name.");
        checkAlbumNameBand1(album1.getTitle());
        checkAlbumNameBand1(album2.getTitle());
        // Check the data extracted from the album1
        String firstAlbumName = ALBUM_NAME + '1';
        if (firstAlbumName.equals(album1.getTitle())) {

        }
    }

    /**
     * Checks if the albums contains all the expected fields.
     */
    public static void checkExtractedAlbum1(ExtractedAlbumDto album) {
        // album.get
    }

    /**
     * Check the album name for the band 1.
     *
     * @param albumTitle The title of the extracted album.
     */
    private static void checkAlbumNameBand1(String albumTitle) {
        if (!albumTitle.equals(ALBUM_NAME + "1") && !albumTitle.equals(ALBUM_NAME + "2")) {
            Assertions.fail("The band1 album '" + albumTitle + "' isn't expected.");
        }
    }


    /**
     * Check that the artist is correct.
     *
     * @param artistName The artist name.
     */
    private static void checkArtistNameIsCorrect(String artistName) {
        if (!artistName.equals(ARTIST_NAME_1) && !artistName.equals(ARTIST_NAME_2)) {
            Assertions.fail("The artist doesn't have a expected name : " + artistName);
        }
    }

}
