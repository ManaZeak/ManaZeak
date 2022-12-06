package org.manazeak.manazeak.entity.dto.library.track;

/**
 * Contains the information displayed on the album view.
 */
public record AlbumTrackDbInfoDto(
        Long trackId,
        String title,
        Double duration,
        String mood,
        Long performerId,
        String performerName,
        String performerPicture,
        boolean performerIsLabel) {}
