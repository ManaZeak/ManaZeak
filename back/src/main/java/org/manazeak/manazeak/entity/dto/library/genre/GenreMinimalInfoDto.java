package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Contains the minimal information to display a genre.
 */
@Data
@AllArgsConstructor
public class GenreMinimalInfoDto implements Comparable<GenreMinimalInfoDto> {

    private Long genreId;

    private String name;

    private String picture;

    @Override
    public int compareTo(GenreMinimalInfoDto genreMinimalInfoDto) {
        return name.compareTo(genreMinimalInfoDto.name);
    }
}
