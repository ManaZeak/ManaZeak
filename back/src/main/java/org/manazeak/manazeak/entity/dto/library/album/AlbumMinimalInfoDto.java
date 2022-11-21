package org.manazeak.manazeak.entity.dto.library.album;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Contains the minimal information needed to display an album in the front.
 */
@Data
@AllArgsConstructor
public class AlbumMinimalInfoDto {

    private Long albumId;

    private String title;

    private String cover;

}
