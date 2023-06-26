package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.integration.track.TrackLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.moodbar.MoodbarGenerationProjection;
import org.manazeak.manazeak.entity.dto.library.track.AlbumTrackDbInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto;
import org.manazeak.manazeak.entity.track.Track;
import org.springframework.data.domain.Pageable;
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
     * Fetch the tracks without moodbar.
     *
     * @param lastTrackId The id of the track to fetch.
     * @param pageable    The size of the page to fetch from the database.
     * @return The tracks without moodbar to be generated.
     */
    @Query("""
            select distinct trk.trackId as id, trk.location as trackPath
            from Track trk
            left join trk.moodbarErrorList moodErr
            where trk.mood is null
            and trk.trackId > :lastTrackId
            and moodErr is null
            order by trk.trackId
            """)
    List<MoodbarGenerationProjection> getTracksWithoutMoodbar(@Param("lastTrackId") Long lastTrackId, Pageable pageable);

    /**
     * Getting the tracks of an album.
     * S
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


    @Query("select new org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto(" +
            "trk.trackId, " +
            "trk.title, " +
            "trk.duration, " +
            "trk.isrc, " +
            "trk.bpm," +
            "trk.mood, " +
            "keys.label, " +
            "keys.keyId, " +
            "perf.artistId, " +
            "perf.name, " +
            "perf.pictureFilename, " +
            "perf.isLabel, " +
            "genre.genreId, " +
            "genre.name, " +
            "genre.pictureFilename, " +
            "comp.artistId, " +
            "comp.name, " +
            "comp.pictureFilename, " +
            "comp.isLabel, " +
            "lyr.artistId, " +
            "lyr.name, " +
            "lyr.pictureFilename, " +
            "lyr.isLabel, " +
            "pro.artistId, " +
            "pro.name, " +
            "pro.pictureFilename, " +
            "pro.isLabel, " +
            "eng.artistId, " +
            "eng.name, " +
            "eng.pictureFilename, " +
            "eng.isLabel) " +
            "from Track trk " +
            "join trk.album alb " +
            "left join trk.keyList keys " +
            "left join trk.performerList perf " +
            "left join trk.genreList genre " +
            "left join trk.composerList comp " +
            "left join trk.lyricistList lyr " +
            "left join trk.producerList pro " +
            "left join trk.engineerList eng " +
            "where alb.albumId = :albumId " +
            "order by trk.discNumber, trk.trackNumber")
    List<TrackCompleteInfoDbDto> getCompleteTrackInfoByAlbumId(@Param("albumId") Long albumId);

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