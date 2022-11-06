package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.integration.track.TrackLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto;
import org.manazeak.manazeak.entity.track.Track;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Data Access Object for Track using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface TrackDAO extends CrudRepository<Track, Long> {

    @Query("select location, trackId from Track where location in (:locations)")
    List<TrackLinkerProjection> getTrackIdByLocation(@Param("locations") List<String> locations);

    /**
     * Getting the tracks of an album.
     *
     * @param albumId The id of the album.
     * @return The list of the tracks contained on the album.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto(" +
            "trk.trackId," +
            "trk.title," +
            "trk.duration) " +
            "from Track trk " +
            "where trk.album.albumId = :albumId")
    List<MinimalTrackInfoDto> getMinimalTracksByAlbumId(@Param("albumId") Long albumId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT