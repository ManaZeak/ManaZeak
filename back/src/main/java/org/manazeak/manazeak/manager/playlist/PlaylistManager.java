package org.manazeak.manazeak.manager.playlist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.constant.notification.playlist.PlaylistNotificationEnum;
import org.manazeak.manazeak.daos.playlist.PlaylistDAO;
import org.manazeak.manazeak.daos.playlist.PlaylistTrackDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.playlist.*;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.mapper.playlist.PlaylistMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

/**
 * The PlaylistManager class provides functionalities to manage playlists,
 * including creation, adding tracks from different sources, and retrieving playlist information.
 * It ensures consistency in playlist attributes and interacts with various DAO components to handle persistence.
 */
@RequiredArgsConstructor
@Component
public class PlaylistManager {

    private final PlaylistMapper playlistMapper;

    private final PlaylistDAO playlistDAO;

    private final PlaylistTrackDAO playlistTrackDAO;


    /**
     * Checking if the playlist public and private flags are coherent.
     *
     * @param playlist The playlist object.
     */
    private static void checkIsPlaylistFlagCoherence(Playlist playlist) {
        if (Boolean.FALSE.equals(playlist.getIsPublic()) && Boolean.TRUE.equals(playlist.getIsPublicEditable())) {
            throw new MzkRuntimeException("Invalid permission flag combination.");
        }
    }

    /**
     * Create a playlist in the database.
     *
     * @param playlistCreation The information on the playlist to create.
     * @param user             The user creating the playlist.
     * @return The playlist created in the database.
     */
    public Playlist createPlaylist(MzkUser user, PlaylistCreationDto playlistCreation) {
        // Creating the playlist from the information provided by the user.
        Playlist playlist = playlistMapper.buildPlaylist(user, playlistCreation);

        // Checking if the boolean flags are coherent.
        checkIsPlaylistFlagCoherence(playlist);

        playlist = playlistDAO.save(playlist);
        if (playlistCreation.getImage() == null || playlistCreation.getImage().isEmpty()) {
            return playlist;
        }

        savePlaylistImage(playlistCreation.getImage(), playlist.getImagePath());

        return playlist;
    }

    /**
     * Updates an existing paylist.
     *
     * @param existingPlaylist The existing playlist in the database.
     * @param playlistEdit     The information sent by the user.
     */
    public void updatePlaylist(Playlist existingPlaylist, PlaylistEditDto playlistEdit) {
        // Building the playlist to save.
        Playlist playlist = playlistMapper.buildPlaylist(existingPlaylist, playlistEdit);

        // Handling the image if there is a new one.
        if (playlistEdit.getImage() != null && !playlistEdit.getImage().isEmpty()) {
            if (existingPlaylist.getImagePath() == null) {
                // Generate an image name.
                playlist.setImagePath(UUID.randomUUID().toString());
            }
            savePlaylistImage(playlistEdit.getImage(), playlist.getImagePath());
        }

        playlistDAO.save(playlist);
    }

    private void savePlaylistImage(MultipartFile image, String imageName) {
        // Save the file in the FS.
        try {
            Files.createDirectories(ResourcePathEnum.PLAYLIST_IMAGE_FOLDER.getPath());
            Path imagePath = ResourcePathEnum.PLAYLIST_IMAGE_FOLDER.getPath().resolve(imageName);
            // Deleting the image if there is already one.
            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
            }
            // Moving the resource.
            image.transferTo(imagePath);
        } catch (IOException e) {
            throw new MzkRuntimeException("Error while saving the playlist image.", e);
        }
    }

    /**
     * Get the playlist information for a user.
     *
     * @param user       The user requesting the playlist.
     * @param playlistId The identifier of the playlist.
     * @return The information of the playlist.
     */
    public PlaylistInfoDto getPlaylistInformation(MzkUser user, Long playlistId) {
        // Getting the playlist
        Playlist playlist = playlistDAO.getPlaylistByIdentifier(user, playlistId)
                .orElseThrow(() -> new MzkRuntimeException("Playlist not found"));

        // Getting the tracks contained in the playlist.
        int nbTracks = playlistDAO.countTrackInPlaylist(playlist);

        // Getting the genres contained in the playlist.
        List<GenreMinimalInfoDto> genreInPlaylist = playlistDAO.getGenresContainedInPlaylist(playlistId);

        // Build the response object.
        return playlistMapper.buildPlaylistInfo(
                playlist,
                nbTracks,
                genreInPlaylist
        );
    }

    /**
     * Filter the playlist available for the user.
     *
     * @param user       The user searching the playlist.
     * @param searchMode The type of search to be applied for the playlist.
     * @return The playlist information.
     */
    public List<PlaylistMinimalInfoDto> filterPlaylist(MzkUser user, PlaylistSearchModeEnum searchMode) {
        return switch (searchMode) {
            case BOTH -> playlistDAO.getAllPlaylist(user.getUsername());
            case PRIVATE_PLAYLIST -> playlistDAO.getPersonalPlaylist(user.getUsername());
            case PUBLIC_PLAYLIST -> playlistDAO.getOtherPublicPlaylist(user.getUsername());
        };
    }

    /**
     * Get the last playlists the user added tracks to.
     *
     * @param user       The user requesting the playlists.
     * @param nbPlaylist The number of playlists to return.
     * @return The last playlists modified by the user.
     */
    public List<PlaylistMinimalInfoDto> getLastPlaylist(MzkUser user, int nbPlaylist) {
        return playlistDAO.getPlaylistByIds(
                playlistDAO.getLastPlaylistWithAddedTrack(user.getUsername(), Pageable.ofSize(nbPlaylist))
        );
    }


    /**
     * Get the playlist for the user.
     *
     * @param user       The user associated with this playlist.
     * @param playlistId The identifier of the playlist.
     * @return The playlist if it is public or the user is the creator.
     */
    public Playlist getPlaylist(MzkUser user, Long playlistId) {
        return playlistDAO.getPlaylistByIdentifier(user, playlistId)
                .orElseThrow(() -> new MzkRuntimeException("No playlist found for the provided identifier.", PlaylistNotificationEnum.PLAYLIST_NOT_FOUND_ERROR));
    }

    /**
     * Delete a playlist.
     *
     * @param playlist The playlist to delete.
     */
    public void deletePlaylist(Playlist playlist) {
        playlistTrackDAO.deleteByPlaylist(playlist);
        playlistDAO.delete(playlist);
    }

    /**
     * Checks if a user can delete a playlist.
     *
     * @param user     The user trying to delete the playlist.
     * @param playlist The playlist to be deleted.
     */
    public void checkUserCanDeletePlaylist(MzkUser user, @NonNull Playlist playlist) {
        // If the user is the creator of the playlist, he can always delete it.
        if (playlist.getCreator().getUserId().equals(user.getUserId())) {
            return;
        }

        // Otherwise, nobody can delete the playlist.
        throw new MzkRuntimeException("You are not allowed to delete this playlist.");
    }

    /**
     * Check if a user can modify the content of a playlist.
     *
     * @param user     The user trying to update the playlist.
     * @param playlist The playlist object.
     */
    public void checkUserCanEditPlaylist(MzkUser user, @NonNull Playlist playlist) {
        // If the user is the creator of the playlist, he can always edit it.
        if (playlist.getCreator().getUserId().equals(user.getUserId())) {
            return;
        }

        // Checking if the playlist is public and editable.
        if (Boolean.FALSE.equals(playlist.getIsPublicEditable())) {
            throw new MzkRuntimeException("You are not allowed to edit this playlist.");
        }

    }

}
