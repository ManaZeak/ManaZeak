package org.manazeak.manazeak.entity.dto.library.track;


/**
 * Contains the minimal amount of information needed to display a track.
 */
public record MinimalTrackInfoDto(Long trackId, String title, Double duration, String mood) {
}
