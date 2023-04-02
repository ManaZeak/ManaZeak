package org.manazeak.manazeak.entity.dto.admin.thumbnail;

/**
 * Contains the information about a thumbnail error.
 */
public record ThumbnailErrorLineDto(
        Long thumbnailErrId,
        String error,
        Boolean processed,
        Long labelId,
        Long albumId,
        Long genreId,
        Long artistId,
        String elementName,
        String typeCode) {
}
