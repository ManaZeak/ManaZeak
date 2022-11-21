package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Contains the minimal information to display a genre.
 */
@Data
@AllArgsConstructor
public class GenreMinimalInfoDto {

    private Long genreId;

    private String name;

    private String picture;
}
