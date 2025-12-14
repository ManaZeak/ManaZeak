package org.manazeak.manazeak.manager.playlist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.constant.notification.playlist.PlaylistNotificationEnum;
import org.manazeak.manazeak.daos.playlist.PlaylistDAO;
import org.manazeak.manazeak.daos.playlist.PlaylistInsertDao;
import org.manazeak.manazeak.daos.playlist.PlaylistTrackDAO;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistCreationDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistInfoDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.playlist.PlaylistTrack;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.track.TrackConverterManager;
import org.manazeak.manazeak.mapper.playlist.PlaylistMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * The PlaylistManager class provides functionalities to manage playlists,
 * including creation, adding tracks from different sources, and retrieving playlist information.
 * It ensures consistency in playlist attributes and interacts with various DAO components to handle persistence.
 */
@RequiredArgsConstructor
@Component
public class PlaylistManager {

    private final PlaylistMapper playlistMapper;

    private final TrackConverterManager converterManager;

    private final PlaylistDAO playlistDAO;

    private final PlaylistInsertDao playlistInsertDao;

    private final AlbumDAO albumDAO;

    private final ArtistDAO artistDAO;

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
        if (playlistCreation.getImage() == null) {
            return playlist;
        }

        // Save the file in the FS.
        try {
            playlistCreation.getImage().transferTo(
                    ResourcePathEnum.PLAYLIST_IMAGE_FOLDER.getPath().resolve(playlist.getPlaylistId().toString())
            );
        } catch (IOException e) {
            throw new MzkRuntimeException("Error while saving the playlist image.", e);
        }

        return playlist;
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
        List<GenreMinimalInfoDto> genreInPlaylist = playlistDAO.getGenresContainedInPlaylist(user, playlistId);

        // Build the response object.
        return playlistMapper.buildPlaylistInfo(
                playlist,
                nbTracks,
                genreInPlaylist
        );
    }

    /**
     * Get the tracks contained in the playlist.
     *
     * @param playlistId The identifier of the playlist
     * @return The tracks of the playlist ordered by rank.
     */
    public List<TrackCompleteInfoDto> getPlaylistTracks(Long playlistId) {
        return converterManager.convertTrackCompleteInfoDbToTrackCompleteInfo(
                playlistDAO.getPlaylistTracks(playlistId)
        );
    }

    /**
     * Add a track to a playlist.
     *
     * @param user     The user making this action.
     * @param playlist The information on the playlist.
     * @param trackId  The identifier of the track.
     */
    public void addTrackToPlaylist(MzkUser user, Playlist playlist, Long trackId) {
        LinkedHashSet<Long> tracks = new LinkedHashSet<>();
        tracks.add(trackId);
        addTracksToPlaylist(user, playlist, tracks);
    }

    /**
     * Add an album to a playlist.
     *
     * @param user     The user making this action.
     * @param playlist The information on the playlist.
     * @param albumId  The identifier of the album.
     */
    public void addAlbumToPlaylist(MzkUser user, Playlist playlist, Long albumId) {
        // Getting the track identifier for the album.
        List<Long> trackIds = albumDAO.getAllAlbumTrackIdentifier(albumId);
        // Building a set from the list.
        LinkedHashSet<Long> tracks = new LinkedHashSet<>(trackIds);
        addTracksToPlaylist(user, playlist, tracks);
    }

    /**
     * Add a whole artist to a playlist.
     *
     * @param user     The user making this action.
     * @param playlist The identifier of the playlist.
     * @param artistId The identifier of the artist.
     */
    public void addArtistToPlaylist(MzkUser user, Playlist playlist, Long artistId) {
        // Getting all the tracks from the artist.
        List<Long> trackIds = artistDAO.getAllArtistTrackIds(artistId);
        // Transforming the list into a set.
        LinkedHashSet<Long> tracks = new LinkedHashSet<>(trackIds);
        addTracksToPlaylist(user, playlist, tracks);
    }

    /**
     * Remove a track from a playlist.
     *
     * @param playlist The playlist containing the track.
     * @param trackId  The identifier of the track.
     */
    public void removeTrackFromPlaylist(Playlist playlist, Long trackId) {
        // Getting the track from the playlist.
        PlaylistTrack playlistTrack = playlistTrackDAO.findByPlaylistAndTrack_TrackId(playlist, trackId)
                .orElseThrow(
                        MzkExceptionHelper.generateMzkRuntimeException("Track not found in playlist.", PlaylistNotificationEnum.PLAYLIST_TRACK_NOT_FOUND_ERROR)
                );

        // Deleting the track.
        playlistTrackDAO.delete(playlistTrack);
    }

    /**
     * Remove tracks from all the playlists of the application.
     *
     * @param trackIds The identifier of the tracks to remove.
     */
    public void removeTracksFromAllPlaylist(List<Long> trackIds) {
        playlistTrackDAO.deleteAllPlaylistTracks(trackIds);
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

    /**
     * Add the tracks to the playlist.
     *
     * @param playlist The playlist information.
     * @param trackIds The identifier of the tracks to add.
     */
    private void addTracksToPlaylist(MzkUser user, Playlist playlist, LinkedHashSet<Long> trackIds) {
        // Getting the tracks existing in the playlist.
        Set<Long> trackContainedInPlaylist = playlistDAO.getTrackContainedInPlaylist(playlist, trackIds);

        List<Long> trackToAdd = new ArrayList<>();
        // Build a list of the tracks to add to the playlist.
        for (Long trackId : trackIds) {
            // Adding the track only if it is not already contained in the playlist.
            if (!trackContainedInPlaylist.contains(trackId)) {
                trackToAdd.add(trackId);
            }
        }

        // Defining the order which the tracks will be added.
        if (playlist.getAppendTrack()) {
            // Counting the track in the playlist and incrementing the counter.
            appendTracks(user, playlist, trackToAdd);
        } else {
            // Adding the number of tracks to add to the existing track playlist.
            prependTracks(user, playlist, trackToAdd);
        }
    }

    /**
     * Append the tracks to the playlist.
     *
     * @param user     The user making this action.
     * @param playlist The information on the play where the track must be added.
     * @param trackIds The identifier of the tracks to add.
     */
    private void appendTracks(MzkUser user, Playlist playlist, List<Long> trackIds) {
        // Counting the number of tracks in the playlist and adding the tracks.
        int existingTracks = playlistDAO.countTrackInPlaylist(playlist) + 1;
        // Inserting the tracks in the playlist.
        playlistInsertDao.addPlaylistTracks(user, playlist, existingTracks, trackIds);
    }

    /**
     * Prepend the tracks to the playlist.
     *
     * @param user     The user making this action.
     * @param playlist The information on the playlist where the tracks must be added.
     * @param trackIds The identifier of the tracks to add.
     */
    private void prependTracks(MzkUser user, Playlist playlist, List<Long> trackIds) {
        int tracksToAdd = trackIds.size();
        // Offsetting the existing tracks
        playlistDAO.offsetPlaylistTracks(playlist, tracksToAdd);
        // Adding the tracks starting with rank 1.
        playlistInsertDao.addPlaylistTracks(user, playlist, 1, trackIds.stream().toList());
    }

}
