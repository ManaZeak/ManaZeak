 package org.manazeak.manazeak.entity.dto.library.label;

import org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;

import java.util.List;

/**
 * Contains the information about a label.
 *
 * @param id      The identifier of the label in the database.
 * @param name    The name of the label.
 * @param picture The picture of the label.
 * @param artists The artists possessing an album released by the label
 * @param albums  The albums released by the label.
 */
public record LabelCompleteInfoDto(
        Long id,
        String name,
        String picture,
        List<ArtistMinimalInfoDto> artists,
        List<AlbumMinimalInfoDto> albums
) {
}
