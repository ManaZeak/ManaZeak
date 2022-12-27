package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the details of a genre of the application.
 */
@Data
public class GenreDetailDto {

    private final List<GenreDetailArtistDto> artists = new ArrayList<>();
    private final String genreName;
    private final String cover;

    public void addArtists(List<GenreDetailArtistDto> artists) {
        this.artists.addAll(artists);
    }

}
