package org.manazeak.manazeak.entity.dto.library.track;

import lombok.Data;

/**
 * Contains the minimal amount of information needed to display a track.
 */
@Data
public class MinimalTrackInfoDto {

    private final Long trackId;

    private final String title;

    private final Double duration;

    private final String mood;
}
