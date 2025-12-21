package org.manazeak.manazeak.mapper.playlist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.playlist.PlaylistAsideDAO;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.playlist.PlaylistAside;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.manazeak.manazeak.constant.notification.playlist.PlaylistNotificationEnum.PLAYLIST_NOT_FOUND_ERROR;

/**
 * Handles the manipulation of playlist in the aside of the application.
 */
@Component
@RequiredArgsConstructor
public class PlaylistAsideManager {

    private final PlaylistAsideDAO playlistAsideDAO;

    /**
     * Add the playlist in the aside of the user.
     *
     * @param user     The information on the user.
     * @param playlist The information on the playlist to add.
     */
    public void addPlaylistToAside(MzkUser user, Playlist playlist) {
        int rank = playlistAsideDAO.countByMzkUser(user) + 1;

        PlaylistAside playlistAside = new PlaylistAside();
        playlistAside.setPlaylist(playlist);
        playlistAside.setMzkUser(user);
        playlistAside.setRank(rank);

        playlistAsideDAO.save(playlistAside);
    }

    /**
     * Remove a playlist from the aside of the user.
     *
     * @param user       The user removing the playlist from his aside.
     * @param playlistId The identifier of the playlist to remove.
     */
    public void removePlaylistInAside(MzkUser user, Long playlistId) {
        // Get the playlist aside.
        PlaylistAside playlistAside = playlistAsideDAO.getPlaylistAsideByMzkUserAndPlaylist_PlaylistId(user, playlistId)
                .orElseThrow(() -> new MzkRuntimeException("Playlist not found in aside", PLAYLIST_NOT_FOUND_ERROR));
        // Remove it.
        playlistAsideDAO.delete(playlistAside);
    }

    /**
     * Change the position of a playlist in the aside of the user.
     *
     * @param user        The user making the change.
     * @param playlistId  The identifier of the playlist to move.
     * @param newPosition The new position to put the playlist in the aside.
     */
    public void moveAsidePlaylist(MzkUser user, Long playlistId, int newPosition) {
        // Get all the playlists in the aside of the user.
        List<PlaylistAside> playlists = playlistAsideDAO.getPlaylistAsideByMzkUser(user);

        // Searching the playlist to move.
        PlaylistAside playlistAside = playlists.stream()
                .filter(pl -> pl.getPlaylist().getPlaylistId().equals(playlistId))
                .findFirst()
                .orElseThrow(() -> new MzkRuntimeException("Playlist not found in aside", PLAYLIST_NOT_FOUND_ERROR));
        // Nothing to do the rank is the same.
        if (playlistAside.getRank() == newPosition) {
            return;
        }

        // Removing the moved playlist and adding it at the right rank.
        playlists.remove(playlistAside);
        playlists.add(Math.max(0, newPosition - 1), playlistAside);

        // Adding the track back at the right rank.
        int rank = 1;
        for (PlaylistAside playlist : playlists) {
            playlist.setRank(rank++);
        }
    }

    /**
     * Get all the playlist aside for a given user.
     *
     * @param user The information about the user.
     * @return The list of playlist available on the aside.
     */
    public List<PlaylistAsideDto> listPlaylistAside(MzkUser user) {
        return playlistAsideDAO.getPlaylistByUser(user);
    }

}
