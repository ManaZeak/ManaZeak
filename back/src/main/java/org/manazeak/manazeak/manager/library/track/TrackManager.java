package org.manazeak.manazeak.manager.library.track;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Allows to manipulate the tracks in the application.
 */
@Component
@RequiredArgsConstructor
public class TrackManager {

    private final TrackDAO trackDAO;

    /**
     * Get the list of tracks linked to the album.
     *
     * @param albumId The id of the album.
     * @return The list of tracks.
     */
    public List<MinimalTrackInfoDto> getMinimalTrackInfoByAlbumId(Long albumId) {
        return trackDAO.getMinimalTracksByAlbumId(albumId);
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
