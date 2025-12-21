package org.manazeak.manazeak.service.playlist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.manager.playlist.PlaylistManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.manazeak.manazeak.mapper.playlist.PlaylistAsideManager;
import org.springframework.stereotype.Service;

/**
 * Handles the manipulation of playlists inside the aside of the user.
 */
@RequiredArgsConstructor
@TransactionalWithRollback
@Service
public class PlaylistAsideService {

    private final PlaylistManager playlistManager;

    private final PlaylistAsideManager playlistAsideManager;

    private final UserManager userManager;

    /**
     * Adds a playlist in the aside of the user.
     *
     * @param playlistId The identifier of the playlist to add in the aside.
     */
    public void addPlaylistInAside(@NonNull Long playlistId) {
        MzkUser user = userManager.getCurrentUser();
        // Checking if the user can access the playlist.
        Playlist playlist = playlistManager.getPlaylist(user, playlistId);

        // Adding the playlist in the aside.
        playlistAsideManager.addPlaylistToAside(user, playlist);
    }

    /**
     * Move a playlist in the aside of the user.
     *
     * @param playlistId  The identifier of the playlist to move.
     * @param newPosition The new position of the playlist in the aside.
     */
    public void movePlaylistInAside(@NonNull Long playlistId, int newPosition) {
        MzkUser user = userManager.getCurrentUser();
        playlistAsideManager.moveAsidePlaylist(user, playlistId, newPosition);
    }

    /**
     * Remove a playlist from the aside of the user.
     *
     * @param playlistId The identifier of the playlist to remove from the aside.
     */
    public void removePlaylistInAside(@NonNull Long playlistId) {
        MzkUser user = userManager.getCurrentUser();
        playlistAsideManager.removePlaylistInAside(user, playlistId);
    }

}
