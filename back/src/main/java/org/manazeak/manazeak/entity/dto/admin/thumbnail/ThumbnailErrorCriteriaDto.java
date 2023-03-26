package org.manazeak.manazeak.entity.dto.admin.thumbnail;

/**
 * Contains the possible filters for the thumbnails error.
 *
 * @param entityTypeId The entity to display.
 * @param errorType    The type of errors.
 * @param processed    If the error has been processed.
 */
public record ThumbnailErrorCriteriaDto(
        Long entityTypeId,
        Long errorType,
        Boolean processed
) {
}
