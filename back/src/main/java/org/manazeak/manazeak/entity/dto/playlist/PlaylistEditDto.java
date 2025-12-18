package org.manazeak.manazeak.entity.dto.playlist;

import jakarta.annotation.Nonnull;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Contains the information needed to create a new playlist for a user.
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class PlaylistEditDto extends PlaylistCreationDto {

    @Nonnull
    private Long playlistId;

}
