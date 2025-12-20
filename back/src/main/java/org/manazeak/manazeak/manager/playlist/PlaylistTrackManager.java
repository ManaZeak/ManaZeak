package org.manazeak.manazeak.manager.playlist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.notification.playlist.PlaylistNotificationEnum;
import org.manazeak.manazeak.daos.playlist.PlaylistDAO;
import org.manazeak.manazeak.daos.playlist.PlaylistInsertDao;
import org.manazeak.manazeak.daos.playlist.PlaylistTrackDAO;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistTrackMoveDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.playlist.PlaylistTrack;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.track.TrackConverterManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Handles the tracks inside the playlists.
 */
@RequiredArgsConstructor
@Component
public class PlaylistTrackManager {

    private final PlaylistDAO playlistDAO;

    private final TrackConverterManager trackConverterManager;

    private final PlaylistInsertDao playlistInsertDao;

    private final PlaylistTrackDAO playlistTrackDAO;

    private final ArtistDAO artistDAO;

    private final AlbumDAO albumDAO;

    /**
     * Get the tracks contained in the playlist.
     *
     * @param playlistId The identifier of the playlist
     * @return The tracks of the playlist ordered by rank.
     */
    public List<TrackCompleteInfoDto> getPlaylistTracks(Long playlistId) {
        return trackConverterManager.convertTrackCompleteInfoDbToTrackCompleteInfo(
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
     * Move tracks position in the playlist.
     *
     * @param playlist          The playlist containing the tracks.
     * @param playlistTrackMove The information on the move to be done.
     */
    public void movePlaylistTracks(Playlist playlist, PlaylistTrackMoveDto playlistTrackMove) {
        // Getting the track of the playlist.
        List<PlaylistTrack> tracks = playlistTrackDAO.findByPlaylistOrderByRank(playlist);

        // Nothing to do if there is one or less track.
        if (tracks.size() <= 1) {
            return;
        }

        // Creating a list of track to move.
        List<PlaylistTrack> tracksToMove = tracks.stream()
                .filter(track -> playlistTrackMove.trackIds().contains(track.getTrack().getTrackId()))
                .toList();

        // Count how many moved tracks are before targetIndex
        int removedBeforeTarget = 0;
        for (PlaylistTrack t : tracksToMove) {
            int idx = tracks.indexOf(t);
            if (idx <= playlistTrackMove.newPosition()) {
                removedBeforeTarget++;
            }
        }

        // Removing the tracks from the playlist.
        tracks.removeAll(tracksToMove);

        tracks.addAll(Math.max(0, playlistTrackMove.newPosition() - removedBeforeTarget), tracksToMove);

        // Adding the track back at the right rank.
        int rank = 1;
        for (PlaylistTrack track : tracks) {
            track.setRank(rank++);
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
