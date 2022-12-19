package org.manazeak.manazeak.entity.dto.library.track;

import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.key.KeyDto;

/**
 * Contains all the fields needed to generate the track complete info dto.
 */
public record TrackCompleteInfoDbDto(Long trackId,
                                     String title,
                                     Double duration,
                                     String isrc,
                                     // Long recordingLocationId,
                                     // String recordingLocation,
                                     Double bpm,
                                     String mood,
                                     String key,
                                     Long keyId,
                                     Long performerId,
                                     String performerName,
                                     String performerPicture,
                                     Boolean performerIsLabel,
                                     Long genreId,
                                     String genreName,
                                     String genrePicture,
                                     Long composerId,
                                     String composerName,
                                     String composerPicture,
                                     Boolean composerIsLabel,
                                     Long lyricistId,
                                     String lyricistName,
                                     String lyricistPicture,
                                     Boolean lyricistIsLabel,
                                     Long producerId,
                                     String producerName,
                                     String producerPicture,
                                     Boolean producerIsLabel,
                                     Long engineerId,
                                     String engineerName,
                                     String engineerPicture,
                                     Boolean engineerIsLabel) {

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
                //recordingLocationId,
                //recordingLocation,
                bpm,
                mood
        );
    }
}
