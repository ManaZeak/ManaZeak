package org.manazeak.manazeak.service.playlist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.library.LibraryItemTypeEnum;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.playlist.*;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.playlist.PlaylistManager;
import org.manazeak.manazeak.manager.playlist.PlaylistTrackManager;
import org.manazeak.manazeak.manager.security.user.UserManager;
import org.manazeak.manazeak.mapper.playlist.PlaylistAsideManager;
import org.manazeak.manazeak.mapper.playlist.PlaylistMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Handles the playlist manipulation in the application.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class PlaylistService {

    private final UserManager userManager;

    private final PlaylistManager playlistManager;

    private final PlaylistTrackManager playlistTrackManager;

    private final PlaylistAsideManager playlistAsideManager;

    private final PlaylistMapper playlistMapper;

    /**
     * Create a playlist for the current user.
     *
     * @param playlistCreation The information on the playlist to create.
     */
    public void createPlaylist(PlaylistCreationDto playlistCreation) {
        // The user creating the playlist.
        MzkUser user = userManager.getCurrentUser();

        // Creating the playlist
        Playlist playlist = playlistManager.createPlaylist(user, playlistCreation);
        // Add the playlist in the aside of the current user.
        playlistAsideManager.addPlaylistToAside(user, playlist);
    }

    /**
     * Edit an existing playlist.
     *
     * @param playlistEdit The playlist to be edited.
     */
    public void updatePlaylist(PlaylistEditDto playlistEdit) {
        MzkUser user = userManager.getCurrentUser();
        // Checking if the playlist is the one of the user.
        Playlist playlist = playlistManager.getPlaylist(user, playlistEdit.getPlaylistId());
        if (!playlist.getCreator().getUsername().equals(user.getUsername())) {
            throw new MzkRuntimeException("You are not allowed to do this.");
        }

        // Updating the existing playlist.
        playlistManager.updatePlaylist(playlist, playlistEdit);
    }

    /**
     * Delete a playlist for the current user.
     *
     * @param playlistId The identifier of the playlist to delete.
     */
    public void deletePlaylist(Long playlistId) {
        MzkUser user = userManager.getCurrentUser();
        Playlist playlist = playlistManager.getPlaylist(user, playlistId);

        // Checking if the user can delete the playlist.
        playlistManager.checkUserCanDeletePlaylist(user, playlist);

        // Deleting the tracks associated with this playlist.
        playlistManager.deletePlaylist(playlist);
    }

    /**
     * Get a playlist edit information.
     *
     * @param playlistId The identifier of the playlist.
     * @return The playlist edit DTO.
     */
    public PlaylistEditDto getPlaylistEditDto(Long playlistId) {
        MzkUser user = userManager.getCurrentUser();
        Playlist playlist = playlistManager.getPlaylist(user, playlistId);

        return playlistMapper.buildPlaylistEdit(playlist);
    }

    /**
     * Get all the playlist available to the user in his aside.
     *
     * @return The playlist element available for the user.
     */
    public List<PlaylistAsideDto> getPlaylistsAsideInfo() {
        return playlistAsideManager.listPlaylistAside(userManager.getCurrentUser());
    }

    /**
     * Get the information of the playlist.
     *
     * @param playlistId The identifier of the playlist.
     * @return The information of the playlist.
     */
    public PlaylistInfoDto getPlaylistInfo(Long playlistId) {
        // Getting the user requesting the playlist.
        MzkUser user = userManager.getCurrentUser();

        // Build the playlist information.
        return playlistManager.getPlaylistInformation(user, playlistId);
    }

    /**
     * Get the list of playlist available for the user.
     *
     * @return The list of playlist.
     */
    public PlaylistContainerDto getPlaylists() {
        // Getting the user requesting the playlist.
        MzkUser user = userManager.getCurrentUser();

        // Filling the container with playlist information.
        return new PlaylistContainerDto(
                playlistManager.filterPlaylist(user, PlaylistSearchModeEnum.PRIVATE_PLAYLIST),
                playlistManager.filterPlaylist(user, PlaylistSearchModeEnum.PUBLIC_PLAYLIST),
                playlistManager.getLastPlaylist(user, 5)
        );
    }

    /**
     * Get the tracks in a user playlist.
     *
     * @param playlistId The identifier of the user playlist.
     * @return The list of the tracks contained in the playlist.
     */
    public List<TrackCompleteInfoDto> getPlaylistTracks(Long playlistId) {
        // Fetching the playlist to check if the user is allowed to access this playlist.
        PlaylistInfoDto playlistInfo = getPlaylistInfo(playlistId);
        return playlistTrackManager.getPlaylistTracks(playlistInfo.playlistId());
    }

    /**
     * Delete a track from a playlist.
     *
     * @param playlistId The identifier of the playlist.
     * @param trackId    The identifier of the track to delete.
     */
    public void deletePlaylistTrack(Long playlistId, Long trackId) {
        // Getting the user requesting the playlist.
        MzkUser user = userManager.getCurrentUser();

        // Fetching the playlist to check if the user is allowed to access this playlist.
        Playlist playlist = playlistManager.getPlaylist(user, playlistId);

        // Checking if the user can delete the track from the playlist and remove it.
        playlistManager.checkUserCanEditPlaylist(user, playlist);
        playlistTrackManager.removeTrackFromPlaylist(playlist, trackId);
    }

    /**
     * Add an item to a playlist.
     *
     * @param playlistId The playlist identifier.
     * @param itemType   The type of item to add in the playlist.
     * @param itemId     The identifier of the item to add.
     */
    public void addItemToPlaylist(@NonNull Long playlistId,
                                  @NonNull LibraryItemTypeEnum itemType, @NonNull Long itemId) {
        MzkUser user = userManager.getCurrentUser();
        Playlist playlist = playlistManager.getPlaylist(user, playlistId);

        // Checking if the user can modify the playlist.
        playlistManager.checkUserCanEditPlaylist(user, playlist);

        // Adding the item to the playlist depending on the type.
        switch (itemType) {
            case TRACK -> playlistTrackManager.addTrackToPlaylist(user, playlist, itemId);
            case ALBUM -> playlistTrackManager.addAlbumToPlaylist(user, playlist, itemId);
            case ARTIST -> playlistTrackManager.addArtistToPlaylist(user, playlist, itemId);
        }
    }

}
