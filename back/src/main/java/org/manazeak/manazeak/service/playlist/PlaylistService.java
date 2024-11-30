package org.manazeak.manazeak.service.playlist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.library.LibraryItemTypeEnum;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistCreationDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.manager.playlist.PlaylistManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.manazeak.manazeak.mapper.playlist.PlaylistMapper;
import org.springframework.stereotype.Service;

/**
 * Handles the playlist manipulation in the application.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class PlaylistService {

    private final UserManager userManager;

    private final PlaylistManager playlistManager;

    private final PlaylistMapper playlistMapper;

    /**
     * Create a playlist for the current user.
     *
     * @param playlistCreation The information on the playlist to create.
     * @return The information on the created playlist to be displayed in the aside.
     */
    public PlaylistAsideDto createPlaylist(PlaylistCreationDto playlistCreation) {
        // The user creating the playlist.
        MzkUser user = userManager.getCurrentUser();

        // Creating the playlist
        Playlist playlist = playlistManager.createPlaylist(user, playlistCreation);

        return playlistMapper.buildPlaylistAside(playlist);
    }

    /**
     * Add an item to a playlist.
     *
     * @param playlistId The playlist identifier.
     * @param itemType   The type of item to add in the playlist.
     * @param itemId     The identifier of the item to add.
     */
    public void addItemToPlaylist(@NonNull MzkUser user, @NonNull Long playlistId,
                                  @NonNull LibraryItemTypeEnum itemType, @NonNull Long itemId) {
        MzkUser currentUser = userManager.getCurrentUser();
        Playlist playlist = playlistManager.getPlaylist(currentUser, playlistId);

        // Checking if the user can modify the playlist.
        playlistManager.checkUserCanEditPlaylist(currentUser, playlist);

        // Adding the item to the playlist depending on the type.
        switch (itemType) {
            case TRACK -> playlistManager.addTrackToPlaylist(user, playlist, itemId);
            case ALBUM -> playlistManager.addAlbumToPlaylist(user, playlist, itemId);
            case ARTIST -> playlistManager.addArtistToPlaylist(user, playlist, itemId);
        }
    }

}
