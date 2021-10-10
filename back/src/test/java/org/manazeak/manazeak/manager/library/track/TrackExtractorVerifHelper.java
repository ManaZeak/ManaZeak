package org.manazeak.manazeak.manager.library.track;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.util.DateUtil;

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
            Assertions.assertEquals(2, band1.getAlbums().size(), "Invalid album size for the artist 1");
            Assertions.assertEquals(2, band2.getAlbums().size(), "Invalid album size for the artist 2");
            checkExtractedAlbumsBand1(band1.getAlbums());
            checkExtractedAlbumsBand2(band2.getAlbums());
        } else {
            Assertions.assertEquals(2, band2.getAlbums().size(), "Invalid album size for the artist 1");
            Assertions.assertEquals(2, band1.getAlbums().size(), "Invalid album size for the artist 2");
            checkExtractedAlbumsBand1(band2.getAlbums());
            checkExtractedAlbumsBand2(band1.getAlbums());
        }
    }

    /**
     * Check the extracted albums from the tracks tags of falc files.
     *
     * @param albums The albums of the artist 2.
     */
    public static void checkExtractedAlbumsBand2(List<ExtractedAlbumDto> albums) {
        // Checking the number of albums.
        Assertions.assertEquals(2, albums.size(), "Wrong number of album found for the artist 2.");
        // Checking the album names.
        ExtractedAlbumDto album1 = albums.get(0);
        ExtractedAlbumDto album2 = albums.get(1);
        // Check the album name.
        Assertions.assertNotEquals(album1.getTitle(), album2.getTitle(), "The albums have the same name.");
        checkAlbumNameBand2(album1.getTitle());
        checkAlbumNameBand2(album2.getTitle());
        // Check the data extracted from the album3
        String firstAlbumName = ALBUM_NAME + '3';
        if (firstAlbumName.equals(album1.getTitle())) {
            checkExtractedAlbum3(album1);
        } else {
            checkExtractedAlbum3(album2);
        }
    }

    /**
     * Check the extracted albums from the tracks tags of mp3 files.
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
            checkExtractedAlbum1(album1);
        } else {
            checkExtractedAlbum1(album2);
        }
    }

    /**
     * Checks if the albums contains all the expected fields.
     */
    public static void checkExtractedAlbum1(ExtractedAlbumDto album) {
        // Checking the number of tracks
        Assertions.assertEquals(2, album.getTracks().size(), "Invalid number of tracks.");
        // Checking the album information
        Assertions.assertEquals(2, album.getDiscTotal(), "Invalid number of total disk.");
        Assertions.assertEquals("test_copyr", album.getLabel(), "Invalid label.");
        Assertions.assertEquals(DateUtil.parseString("1999-01-01", DateUtil.US_DATE_FORMATTER), album.getReleaseDate(), "Invalid release date.");
        Assertions.assertEquals(5, album.getTrackTotal(), "Invalid number of tracks.");
        Assertions.assertEquals("1111", album.getYear(), "Invalid album year.");
        // Checking the first track of the album to verify all the tags were extracted.
        ExtractedTrackDto track = album.getTracks().get(0);
        checkTrackAlbum1Title(track.getTitle());
        if (track.getTitle().equals("1")) {
            checkTrack1(track);
        } else {
            checkTrack1(album.getTracks().get(1));
        }
    }

    /**
     * Checks if the albums contains all the expected fields.
     */
    public static void checkExtractedAlbum3(ExtractedAlbumDto album) {
        // Checking the number of tracks
        Assertions.assertEquals(2, album.getTracks().size(), "Invalid number of tracks.");
        // Checking the album information
        Assertions.assertEquals(4, album.getDiscTotal(), "Invalid number of total disk.");
        Assertions.assertEquals("test_copyr", album.getLabel(), "Invalid label.");
        Assertions.assertEquals(DateUtil.parseString("1999-01-05", DateUtil.US_DATE_FORMATTER), album.getReleaseDate(), "Invalid release date.");
        Assertions.assertEquals(3, album.getTrackTotal(), "Invalid number of tracks.");
        Assertions.assertEquals("5555", album.getYear(), "Invalid album year.");
        // Checking the first track of the album to verify all the extracted tags.
        ExtractedTrackDto track = album.getTracks().get(0);
        checkTrackAlbum3Title(track.getTitle());
        if (track.getTitle().equals("1")) {
            checkTrack5(track);
        } else {
            checkTrack5(album.getTracks().get(1));
        }
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
     * Check the album name for the band 2.
     *
     * @param albumTitle The title of the extracted album.
     */
    private static void checkAlbumNameBand2(String albumTitle) {
        if (!albumTitle.equals(ALBUM_NAME + "3") && !albumTitle.equals(ALBUM_NAME + "4")) {
            Assertions.fail("The band2 album '" + albumTitle + "' isn't expected.");
        }
    }

    /**
     * Check the information extracted from the first track of the album 1 of the band 1.
     *
     * @param track The track to be tested.
     */
    private static void checkTrack1(ExtractedTrackDto track) {
        Assertions.assertEquals("test_lyrics", track.getLyrics(), "Invalid lyrics.");
        // Check the size of the extracted artists
        Assertions.assertEquals(2, track.getArtists().size(), "Invalid number of extracted artists for the track5.");
        Assertions.assertEquals("test_artist1", track.getArtists().get(0), "Invalid name of the extracted artist 1");
        Assertions.assertEquals("test_artist2", track.getArtists().get(1), "Invalid name of the extracted artist 2");
        // Check the size of the composers
        Assertions.assertEquals(3, track.getComposers().size(), "Invalid numbers of extracted albums");
        Assertions.assertEquals("test_compo1", track.getComposers().get(0), "Invalid composer name");
        Assertions.assertEquals("test_compo2", track.getComposers().get(1), "Invalid composer name");
        Assertions.assertEquals("test_compo3", track.getComposers().get(2), "Invalid composer name");
        // Check the genres.
        Assertions.assertEquals(2, track.getGenres().size(), "Invalid number of genres.");
        Assertions.assertEquals("test", track.getGenres().get(0), "Invalid genre name");
        Assertions.assertEquals("test2", track.getGenres().get(1), "Invalid genre name");
        // Check the size of the performers.
        Assertions.assertEquals(2, track.getPerformers().size(), "Invalid number of performers.");
        Assertions.assertEquals("test_art_orig", track.getPerformers().get(0), "Invalid performer name.");
        Assertions.assertEquals("test_art_orig_2", track.getPerformers().get(1), "Invalid performer name.");
        // Check the size of the producers.
        Assertions.assertEquals(2, track.getProducers().size(), "Invalid number of producers");
        Assertions.assertEquals("test_prod", track.getProducers().get(0), "Invalid producer name");
        Assertions.assertEquals("test_prod2", track.getProducers().get(1), "Invalid producer name");
        // Check the lyrics
        Assertions.assertEquals("1111", track.getYear(), "Invalid year.");
        Assertions.assertEquals(1, track.getDiscNumber(), "Invalid disc number.");
        Assertions.assertEquals(1, track.getTrackNumber(), "Invalid track number.");
    }

    /**
     * Check the information extracted from the first track of the album 3 of the band 2.
     *
     * @param track The track to be tested.
     */
    private static void checkTrack5(ExtractedTrackDto track) {
        Assertions.assertEquals("test_lyrics", track.getLyrics(), "Invalid lyrics.");
        // Check the size of the extracted artists
        Assertions.assertEquals(2, track.getArtists().size(), "Invalid number of extracted artists for the track5.");
        Assertions.assertEquals("test_artist3", track.getArtists().get(0), "Invalid name of the extracted artist 1");
        Assertions.assertEquals("test_artist2", track.getArtists().get(1), "Invalid name of the extracted artist 2");
        // Check the size of the composers
        Assertions.assertEquals(2, track.getComposers().size(), "Invalid numbers of extracted albums");
        Assertions.assertEquals("test_compo2", track.getComposers().get(0), "Invalid composer name");
        Assertions.assertEquals("test_compo5", track.getComposers().get(1), "Invalid composer name");
        // Check the genres.
        Assertions.assertEquals(2, track.getGenres().size(), "Invalid number of genres.");
        Assertions.assertEquals("test", track.getGenres().get(0), "Invalid genre name");
        Assertions.assertEquals("test1", track.getGenres().get(1), "Invalid genre name");
        // Check the size of the performers.
        Assertions.assertEquals(2, track.getPerformers().size(), "Invalid number of performers.");
        Assertions.assertEquals("test_art_orig", track.getPerformers().get(0), "Invalid performer name.");
        Assertions.assertEquals("test_artist3", track.getPerformers().get(1), "Invalid performer name.");
        // Check the size of the producers.
        Assertions.assertEquals(2, track.getProducers().size(), "Invalid number of producers");
        Assertions.assertEquals("test_prod1", track.getProducers().get(0), "Invalid producer name");
        Assertions.assertEquals("test_prod", track.getProducers().get(1), "Invalid producer name");
    }

    /**
     * Checks if the extracted tracks from the album 1.
     *
     * @param trackTitle The title of the track.
     */
    private static void checkTrackAlbum1Title(String trackTitle) {
        if (!"1".equals(trackTitle) && !"2".equals(trackTitle)) {
            Assertions.fail("The track " + trackTitle + " wasn't expected.");
        }
    }

    /**
     * Checks if the extracted tracks from the album 2.
     *
     * @param trackTitle The title of the track.
     */
    private static void checkTrackAlbum3Title(String trackTitle) {
        if (!"5".equals(trackTitle) && !"6".equals(trackTitle)) {
            Assertions.fail("The track " + trackTitle + " wasn't expected.");
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
