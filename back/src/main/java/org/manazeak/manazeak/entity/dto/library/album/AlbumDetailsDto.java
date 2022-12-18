package org.manazeak.manazeak.entity.dto.library.album;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.AlbumTrackInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information need to display the album detail page.
 */
@Data
@AllArgsConstructor
public class AlbumDetailsDto {

    private final List<AlbumTrackInfoDto> tracks = new ArrayList<>();
    private final List<ArtistMinimalInfoDto> performers = new ArrayList<>();
    private Long albumId;
    private String title;
    private String cover;
    private Integer totalTrack;
    private Long albumArtistId;
    private String albumArtist;
    private String albumArtistPicture;
    private LocalDate releaseDate;
    private Long labelId;
    private String labelName;
    private Double duration;
    private String catalogNumber;
    private String eanUpn;
    private LocalDate startingRecordingDate;
    private LocalDate endRecordingDate;

    public void addTracks(List<AlbumTrackInfoDto> newTracks) {
        tracks.addAll(newTracks);
    }

    public void addPerformer(ArtistMinimalInfoDto performer) {
        performers.add(performer);
    }
}
