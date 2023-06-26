package org.manazeak.manazeak.manager.library.track;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Allows manipulating the tracks in the application.
 */
@Component
@RequiredArgsConstructor
public class TrackManager {

    private final TrackDAO trackDAO;

    private final TrackCompleteConverterManager converterManager;

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
     * Get the list of tracks by genres.
     *
     * @param genreId The id of the genre.
     * @return The list of tracks linked to the genre.
     */
    public List<TrackInfoDto> getTrackInfoByGenreId(Long genreId) {
        return trackDAO.getTrackInfoByGenreId(genreId);
    }

}
