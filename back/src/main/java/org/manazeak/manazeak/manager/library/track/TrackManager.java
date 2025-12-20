package org.manazeak.manazeak.manager.library.track;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto;
import org.manazeak.manazeak.entity.dto.library.integration.track.TrackLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.manager.playlist.PlaylistTrackManager;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Allows manipulating the tracks in the application.
 */
@Component
@RequiredArgsConstructor
public class TrackManager {

    private final TrackDAO trackDAO;

    private final TrackConverterManager converterManager;

    private final PlaylistTrackManager playlistTrackManager;

    /**
     * Get the tracks of an album and set the performer of the album.
     *
     * @param albumDetails The information on the album.
     */
    public void getCompleteTracksInfoFromAlbum(AlbumDetailsDto albumDetails) {
        // Get the tracks in the database and convert them into displayable objects.
        albumDetails.addAllTracks(converterManager.convertTrackCompleteInfoDbToTrackCompleteInfo(
                trackDAO.getCompleteTrackInfoByAlbumId(albumDetails.getAlbumId()))
        );
        // Extracting the performers to display them.
        for (TrackCompleteInfoDto track : albumDetails.getTracks()) {
            albumDetails.addPerformers(track.getPerformers());
        }
    }

    /**
     * Delete a list of tracks from the database.
     *
     * @param trackLocations The location of the deleted tracks.
     */
    public void removeTracks(List<String> trackLocations) {
        // Getting all the identifier for the tracks.
        List<Long> trackIds = trackDAO.getTrackIdByLocation(trackLocations).stream()
                .map(TrackLinkerProjection::getTrackId).toList();
        // Remove the tracks from all the user playlist.
        playlistTrackManager.removeTracksFromAllPlaylist(trackIds);
        // Delete the tracks from the database.
        trackDAO.deleteAllById(trackIds);
    }
}
