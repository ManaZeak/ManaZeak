package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the details of a genre of the application.
 */
@Data
@AllArgsConstructor
public class GenreDetailDto {

    private final List<TrackInfoDto> tracks = new ArrayList<>();
    private String genreName;
    private String cover;

    public void addGenres(List<TrackInfoDto> newTracks) {
        tracks.addAll(newTracks);
    }

}
