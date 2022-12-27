package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Data;

import java.util.SortedSet;
import java.util.TreeSet;

/**
 * Contains all the information of a genre contained in the database.
 */
@Data
public class GenreCompleteInfoDto {

    private final Long genreId;
    private final String genreName;
    private final String genreCover;
    private final SortedSet<GenreDetailArtistDto> artists = new TreeSet<>();

}
