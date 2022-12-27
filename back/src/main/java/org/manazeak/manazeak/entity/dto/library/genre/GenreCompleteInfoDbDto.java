package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Getter;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto;

import java.time.LocalDate;

/**
 * Contains the data needed to display the genre detail view.
 */
@Getter
public class GenreCompleteInfoDbDto extends TrackCompleteInfoDbDto {


    private final Long artistId;

    private final String artistName;

    private final Boolean artistIsLabel;

    private final String artistPicture;

    private final Long albumId;

    private final String albumTitle;

    private final String albumCover;

    private final LocalDate albumReleaseDateTime;


    public GenreCompleteInfoDbDto(Long trackId, String title, Double duration, String isrc, Double bpm,
                                  String mood, String key, Long keyId, Long performerId, String performerName,
                                  String performerPicture, Boolean performerIsLabel, Long genreId,
                                  String genreName, String genrePicture, Long composerId, String composerName,
                                  String composerPicture, Boolean composerIsLabel, Long lyricistId,
                                  String lyricistName, String lyricistPicture, Boolean lyricistIsLabel,
                                  Long producerId, String producerName, String producerPicture,
                                  Boolean producerIsLabel, Long engineerId, String engineerName,
                                  String engineerPicture, Boolean engineerIsLabel, Long artistId,
                                  String artistName, Boolean artistIsLabel, String artistPicture, Long albumId,
                                  String albumTitle, String albumCover, LocalDate releaseDateTime) {
        super(trackId, title, duration, isrc, bpm, mood, key, keyId, performerId, performerName, performerPicture,
                performerIsLabel, genreId, genreName, genrePicture, composerId, composerName, composerPicture,
                composerIsLabel, lyricistId, lyricistName, lyricistPicture, lyricistIsLabel, producerId, producerName,
                producerPicture, producerIsLabel, engineerId, engineerName, engineerPicture, engineerIsLabel);
        this.artistId = artistId;
        this.artistName = artistName;
        this.artistIsLabel = artistIsLabel;
        this.artistPicture = artistPicture;
        this.albumId = albumId;
        this.albumTitle = albumTitle;
        this.albumCover = albumCover;
        this.albumReleaseDateTime = releaseDateTime;
    }

    public GenreDetailArtistDto getGenreArtistDto() {
        return new GenreDetailArtistDto(artistId, artistName, artistPicture, artistIsLabel);
    }

    public GenreDetailAlbumDto getGenreAlbumDto() {
        return new GenreDetailAlbumDto(albumId, albumTitle, albumCover, albumReleaseDateTime);
    }

}
