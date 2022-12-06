package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.integration.track.TrackLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.track.AlbumTrackDbInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto;
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
    @Query("select new org.manazeak.manazeak.entity.dto.library.track.AlbumTrackDbInfoDto(" +
            "trk.trackId, " +
            "trk.title, " +
            "trk.duration, " +
            "trk.mood," +
            "perf.artistId, " +
            "perf.name," +
            "perf.pictureFilename," +
            "perf.isLabel) " +
            "from Track trk " +
            "join trk.performerList perf " +
            "where trk.album.albumId = :albumId " +
            "order by trk.discNumber, trk.trackNumber")
    List<AlbumTrackDbInfoDto> getMinimalTracksByAlbumId(@Param("albumId") Long albumId);


    /**
     * Get the track information given a genre.
     *
     * @param genreId The id of the genre to get in the database.
     * @return The list of tracks corresponding to the genre.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto(" +
            "trk.title," +
            "trk.duration," +
            "art.name) " +
            "from Track trk " +
            "join trk.genreList genre " +
            "join trk.album.artist art " +
            "where genre.genreId = :genreId")
    List<TrackInfoDto> getTrackInfoByGenreId(@Param("genreId") Long genreId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT