package org.manazeak.manazeak.mapper.playlist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.playlist.PlaylistAsideDAO;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.playlist.PlaylistAside;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.stereotype.Component;

import java.util.List;

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
     * Get all the playlist aside for a given user.
     *
     * @param user The information about the user.
     * @return The list of playlist available on the aside.
     */
    public List<PlaylistAsideDto> listPlaylistAside(MzkUser user) {
        return playlistAsideDAO.getPlaylistByUser(user);
    }

}
