package org.manazeak.manazeak.entity.dto.library.integration.genre;

import lombok.Data;

/**
 * Contains the information of a genre needed to be inserted in the database.
 */
@Data
public class GenreIntegrationDto {

    private Long genreId;

    private String genreName;

}
