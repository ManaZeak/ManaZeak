package org.manazeak.manazeak.entity.dto.library.track;

/**
 * Contains the information of a track associated to one of its performers.
 */
public record TrackWithPartialPerformerDto(
        Long trackId,
        String title,
        String performer,
        String albumTitle,
        Double duration,
        String cover,
        String mood) {
}
