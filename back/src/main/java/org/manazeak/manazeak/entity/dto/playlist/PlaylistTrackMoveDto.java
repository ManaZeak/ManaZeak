package org.manazeak.manazeak.entity.dto.playlist;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Min;

import java.util.Set;

/**
 * Contains the information needed to move tracks in a playlist.
 *
 * @param trackIds    The identifier of the tracks to move.
 * @param newPosition The new position of the tracks.
 */
public record PlaylistTrackMoveDto(
        @Nonnull Set<Long> trackIds,
        @Min(1) int newPosition
) {
}
