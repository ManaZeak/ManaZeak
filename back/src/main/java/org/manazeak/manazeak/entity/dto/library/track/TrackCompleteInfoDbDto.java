package org.manazeak.manazeak.entity.dto.library.track;

import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.key.KeyDto;

/**
 * Contains all the fields needed to generate the track complete info dto.
 */
@Data
public class TrackCompleteInfoDbDto {

    protected final Long trackId;
    protected final String title;
    protected final Double duration;
    protected final String isrc;
    protected final Double bpm;
    protected final String mood;
    protected final String key;
    protected final Long keyId;
    protected final Long performerId;
    protected final String performerName;
    protected final String performerPicture;
    protected final Boolean performerIsLabel;
    protected final Long genreId;
    protected final String genreName;
    protected final String genrePicture;
    protected final Long composerId;
    protected final String composerName;
    protected final String composerPicture;
    protected final Boolean composerIsLabel;
    protected final Long lyricistId;
    protected final String lyricistName;
    protected final String lyricistPicture;
    protected final Boolean lyricistIsLabel;
    protected final Long producerId;
    protected final String producerName;
    protected final String producerPicture;
    protected final Boolean producerIsLabel;
    protected final Long engineerId;
    protected final String engineerName;
    protected final String engineerPicture;
    protected final Boolean engineerIsLabel;

    public ArtistMinimalInfoDto getPerformer() {
        if (performerId == null) {
            return null;
        }
        return new ArtistMinimalInfoDto(performerId, performerName, performerPicture, performerIsLabel);
    }

    public ArtistMinimalInfoDto getLyricist() {
        if (lyricistId == null) {
            return null;
        }
        return new ArtistMinimalInfoDto(lyricistId, lyricistName, lyricistPicture, lyricistIsLabel);
    }

    public ArtistMinimalInfoDto getComposer() {
        if (composerId == null) {
            return null;
        }
        return new ArtistMinimalInfoDto(composerId, composerName, composerPicture, composerIsLabel);
    }

    public ArtistMinimalInfoDto getProducer() {
        if (producerId == null) {
            return null;
        }
        return new ArtistMinimalInfoDto(producerId, producerName, producerPicture, producerIsLabel);
    }

    public ArtistMinimalInfoDto getEngineer() {
        if (engineerId == null) {
            return null;
        }
        return new ArtistMinimalInfoDto(engineerId, engineerName, engineerPicture, engineerIsLabel);
    }

    /**
     * Build a new genre from the information of the track.
     *
     * @return The genre.
     */
    public GenreMinimalInfoDto getGenre() {
        if (genreId == null) {
            return null;
        }
        return new GenreMinimalInfoDto(genreId, genreName, genrePicture);
    }

    public KeyDto getKey() {
        if (keyId == null) {
            return null;
        }
        return new KeyDto(keyId, key);
    }

    /**
     * Get the information that are in commons of a track (all the many to one and the info of the table.).
     *
     * @return The track object created.
     */
    public TrackCompleteInfoDto getTrackBasicInfo() {
        return new TrackCompleteInfoDto(
                trackId,
                title,
                duration,
                isrc,
                bpm,
                mood
        );
    }
}
