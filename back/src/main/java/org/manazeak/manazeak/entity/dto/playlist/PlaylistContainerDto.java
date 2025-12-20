package org.manazeak.manazeak.entity.dto.playlist;

import java.util.List;

/**
 * Contains the information to display the user playlists.
 *
 * @param userPlaylists   The playlists of the user.
 * @param publicPlaylists The playlist shared with the user.
 */
public record PlaylistContainerDto(List<PlaylistMinimalInfoDto> userPlaylists,
                                   List<PlaylistMinimalInfoDto> publicPlaylists,
                                   List<PlaylistMinimalInfoDto> lastUpdatedPlaylists) {
}
