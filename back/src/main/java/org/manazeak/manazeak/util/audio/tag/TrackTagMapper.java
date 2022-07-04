package org.manazeak.manazeak.util.audio.tag;

import org.manazeak.manazeak.entity.dto.audio.AudioFileContainerDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.util.CastUtil;
import org.manazeak.manazeak.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.format.DateTimeParseException;

/**
 * Map the track fields into the different objects.
 */
public final class TrackTagMapper {

    private static final Logger LOG = LoggerFactory.getLogger(TrackTagMapper.class);

    private TrackTagMapper() {

    }

    /**
     * Contains the mapping between the track's tags and the objects.
     *
     * @param fileContainer The information extracted from the tags.
     * @param album         The information about the current album.
     * @param band          The information about the current band.
     * @return The information about the track.
     */
    public static ExtractedTrackDto mapExtractedTrackToObjects(
            AudioFileContainerDto fileContainer,
            ExtractedAlbumDto album,
            ExtractedBandDto band) {
        // Getting the information of the band.
        if (band.getName() == null) {
            band.setName(fileContainer.getAlbumArtist());
        }

        // Getting the information about the album
        if (album.getTitle() == null) {
            fillAlbumInformation(fileContainer, album);
        }

        // Getting the information about the track
        ExtractedTrackDto track = new ExtractedTrackDto();
        fillTrackInformation(fileContainer, track);

        return track;
    }

    /**
     * Get the information extracted in the track's tags into the album.
     *
     * @param fileContainer the information about information
     * @param album         The information about the album.
     */
    private static void fillAlbumInformation(AudioFileContainerDto fileContainer, ExtractedAlbumDto album) {
        album.setTitle(fileContainer.getAlbum());
        album.setDiscTotal(CastUtil.castStringToInt(fileContainer.getDiskTotal()));
        album.setLabel(fileContainer.getLabel());
        album.setYear(fileContainer.getDate());
        try {
            album.setReleaseDate(DateUtil.parseString(fileContainer.getReleaseDate(), DateUtil.US_DATE_FORMATTER));
        } catch (DateTimeParseException e) {
            LOG.warn("The release date : '{}' of the track {} - {} couldn't be parsed.",
                    fileContainer.getReleaseDate(), fileContainer.getAlbumArtist(), fileContainer.getTitle(), e);
        }
        album.setTrackTotal(CastUtil.castStringToInt(fileContainer.getTrackTotal()));
        album.setEanUpn(fileContainer.getEanUpn());
        album.setCatalogNumber(fileContainer.getCatalogNumber());
    }

    /**
     * Get the information extracted from the track's tags.
     *
     * @param fileContainer The extracted data from the track's tag.
     * @param track         The track information.
     */
    private static void fillTrackInformation(AudioFileContainerDto fileContainer, ExtractedTrackDto track) {
        // Getting the track title.
        track.setTitle(fileContainer.getTitle());
        track.setArtists(TagSplitterUtil.splitTag(fileContainer.getArtist()));
        track.setPerformers(TagSplitterUtil.splitTag(fileContainer.getPerformer()));
        track.setComposers(TagSplitterUtil.splitComposer(fileContainer.getComposer()));
        track.setProducers(TagSplitterUtil.splitTag(fileContainer.getProducer()));
        track.setGenres(TagSplitterUtil.splitTag(fileContainer.getGenre()));
        track.setYear(fileContainer.getDate());
        track.setDiscNumber(CastUtil.castStringToInt(fileContainer.getDiscNumber()));
        track.setTrackNumber(CastUtil.castStringToInt(fileContainer.getTrackNumber()));
        track.setBitrate(fileContainer.getHeaders().getBitrate());
        track.setSampleRate(fileContainer.getHeaders().getSampleRate());
        track.setLength(fileContainer.getHeaders().getTrackLength());
        track.setSize(fileContainer.getHeaders().getSize());
        track.setLyrics(fileContainer.getLyrics());
    }

}
