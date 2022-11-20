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

    private String genreName;
    private String cover;
    private final List<GenreDetailArtistDto> artists = new ArrayList<>();

    public void addArtists(List<GenreDetailArtistDto> artists) {
        this.artists.addAll(artists);
    }

}
