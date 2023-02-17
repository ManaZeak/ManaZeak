package org.manazeak.manazeak.entity.dto.library.album;

import lombok.AllArgsConstructor;
import lombok.Data;


/**
 * Contains the data needed to display an album in the artist detail page.
 */
@Data
@AllArgsConstructor
public class AlbumMinimalInfoDto {

    private Long albumId;

    private String title;

    private String cover;

    private Integer releaseYear;

}
