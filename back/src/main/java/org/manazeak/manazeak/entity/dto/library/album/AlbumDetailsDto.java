package org.manazeak.manazeak.entity.dto.library.album;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;

import java.time.LocalDate;
import java.util.*;

/**
 * Contains the information need to display the album detail page.
 */
@Data
@AllArgsConstructor
public class AlbumDetailsDto {

    private final List<TrackCompleteInfoDto> tracks = new ArrayList<>();
    private final SortedSet<ArtistMinimalInfoDto> performers = new TreeSet<>();
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

    public void addAllTracks(List<TrackCompleteInfoDto> newTracks) {
        tracks.addAll(newTracks);
    }

    public void addPerformers(Collection<ArtistMinimalInfoDto> performers) {
        this.performers.addAll(performers);
    }

}
