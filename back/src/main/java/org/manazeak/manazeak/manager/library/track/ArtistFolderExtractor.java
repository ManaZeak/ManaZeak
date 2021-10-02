package org.manazeak.manazeak.manager.library.track;

import org.manazeak.manazeak.entity.dto.audio.AudioFileContainerDto;
import org.manazeak.manazeak.entity.dto.library.scan.*;
import org.manazeak.manazeak.exception.MzkTagException;
import org.manazeak.manazeak.util.audio.tag.TagReaderUtil;
import org.manazeak.manazeak.util.audio.tag.TrackTagMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;

/**
 * Extract all the tags contained in an artist folder.
 */
public class ArtistFolderExtractor implements Callable<ExtractedBandDto> {

    private static final Logger LOG = LoggerFactory.getLogger(ArtistFolderExtractor.class);
    private final ScannedArtistDto artistFolder;

    public ArtistFolderExtractor(ScannedArtistDto artistFolder) {
        this.artistFolder = artistFolder;
    }

    /**
     * Extract the information contained in the album folder of an artist.
     *
     * @param band         The information about the band of the album.
     * @param scannedAlbum The information about the album folder.
     * @return The album information extracted in the track tags.
     */
    private static ExtractedAlbumDto extractAlbumFolder(ExtractedBandDto band, ScannedAlbumDto scannedAlbum) {
        // Build the album object.
        ExtractedAlbumDto album = new ExtractedAlbumDto(scannedAlbum.getLocation());
        // Getting the information contained in the tracks.
        for (ScannedTrackDto track : scannedAlbum.getTracks()) {
            ExtractedTrackDto extractedTrack = extractTrackFile(band, album, track);
            // Adding only the track that were successful.
            if (extractedTrack == null) {
                continue;
            }
            album.addTrack(extractedTrack);
        }
        // If the album is empty, we warn the admin about it.
        if (album.getTracks().isEmpty()) {
            LOG.warn("The album located at : {} is empty. The tracks couldn't be extracted.",
                    scannedAlbum.getLocation());
            return null;
        }
        return album;
    }

    /**
     * Extract the information contained in the track tags.
     *
     * @param band         The information about the band of the track.
     * @param album        The information about the album of the track.
     * @param scannedTrack The FS information about the track.
     * @return The track that will be added to the album.
     */
    private static ExtractedTrackDto extractTrackFile(ExtractedBandDto band,
                                                      ExtractedAlbumDto album,
                                                      ScannedTrackDto scannedTrack) {
        try {
            // Getting the information from the track tag.
            AudioFileContainerDto fileContainer = TagReaderUtil.extractTagFromAudioFile(scannedTrack.getTrackPath());
            // Mapping the container with the extracted objects.
            return TrackTagMapper.mapExtractedTrackToObjects(fileContainer, album, band);
        } catch (MzkTagException e) {
            LOG.warn("Error during the extraction of the track tag : {}", scannedTrack.getTrackPath(), e);
        }
        return null;
    }

    @Override
    public ExtractedBandDto call() {
        return extractArtistFolder();
    }

    /**
     * Extract an artist folder containing albums and tracks.
     *
     * @return The extracted data of the artist.
     */
    private ExtractedBandDto extractArtistFolder() {
        // Creating the band object.
        ExtractedBandDto band = new ExtractedBandDto(artistFolder.getArtistPath());
        // Going through the album of the artist.
        for (ScannedAlbumDto scannedAlbum : artistFolder.getAlbums()) {
            ExtractedAlbumDto album = extractAlbumFolder(band, scannedAlbum);
            if (album == null) {
                continue;
            }
            band.addExtractedAlbum(album);
        }
        if (band.getAlbums().isEmpty()) {
            LOG.warn("The artist located at : {} is empty. No album has been extracted.", artistFolder.getArtistPath());
            return null;
        }
        return band;
    }
}
