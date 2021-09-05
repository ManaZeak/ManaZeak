package org.manazeak.manazeak.util.audio.tag;

import org.manazeak.manazeak.entity.dto.audio.AudioFileContainerDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.util.DateUtil;

/**
 * Map the track fields into the different objects.
 */
public final class TrackTagMapper {

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
     * @param fileContainer the information about information
     */
    private static void fillAlbumInformation(AudioFileContainerDto fileContainer, ExtractedAlbumDto album) {
        album.setTitle(fileContainer.getAlbum());
        album.setDiscTotal(fileContainer.getDiskTotal());
        album.setLabel(fileContainer.getLabel());
        album.setYear(fileContainer.getDate());
        album.setReleaseDate(DateUtil.parseString(fileContainer.getReleaseDate(), DateUtil.US_DATE_FORMATTER));
        album.setTrackTotal(Integer.parseInt(fileContainer.getTrackTotal()));
    }

    /**
     * Get the information extracted from the track's tags.
     * @param fileContainer The extracted data from the track's tag.
     * @param track The track information.
     */
    private static void fillTrackInformation(AudioFileContainerDto fileContainer, ExtractedTrackDto track) {
        // Getting the track title.
        track.setTitle(fileContainer.getTitle());
        track.setArtists(TagSplitterHelper.splitTag(fileContainer.getArtist()));
        track.setPerformers(TagSplitterHelper.splitTag(fileContainer.getPerformer()));
        track.setComposers(TagSplitterHelper.splitTag(fileContainer.getComposer()));
        track.setProducers(TagSplitterHelper.splitTag(fileContainer.getProducer()));
        track.setGenres(TagSplitterHelper.splitTag(fileContainer.getGenre()));
        track.setYear(fileContainer.getDate());
        track.setDiscNumber(Integer.parseInt(fileContainer.getDiscNumber()));
        track.setTrackNumber(Integer.parseInt(fileContainer.getTrackNumber()));
    }

}
