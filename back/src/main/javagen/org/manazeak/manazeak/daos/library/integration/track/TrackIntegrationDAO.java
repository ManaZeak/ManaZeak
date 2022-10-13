package org.manazeak.manazeak.daos.library.integration.track;

import org.manazeak.manazeak.constant.library.track.TrackArtistLinkTableEnum;
import org.manazeak.manazeak.entity.dto.library.integration.track.TrackIntegrationDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TrackIntegrationDAO {

    private static final String SQL_TRACK_MERGE = "INSERT INTO track (track_id, title, disc_number, track_number, isrc, lyrics, duration, opus, subtitle, album_id, " +
            "                   location, bpm) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
            "ON CONFLICT (track_id) DO UPDATE SET title        = excluded.title, " +
            "                                     disc_number  = excluded.disc_number, " +
            "                                     track_number = excluded.track_number, " +
            "                                     isrc         = excluded.isrc, " +
            "                                     lyrics       = excluded.lyrics, " +
            "                                     duration     = excluded.duration, " +
            "                                     opus         = excluded.opus, " +
            "                                     subtitle     = excluded.subtitle, " +
            "                                     album_id     = excluded.album_id, " +
            "                                     location     = excluded.location, " +
            "                                     bpm          = excluded.bpm";
    private static final String SQL_LINK_ARTIST = "INSERT INTO ";
    private final JdbcTemplate jdbcTemplate;

    public TrackIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Merge the tracks that has been scanned into the database.
     *
     * @param tracks The information about the scanned tracks.
     */
    public void mergeTracks(List<TrackIntegrationDto> tracks) {
        // Inserting 
        jdbcTemplate.batchUpdate(SQL_TRACK_MERGE, new TrackIntegrationUpsertSetter(tracks));
    }


    /**
     * Delete all the association between the tracks and the artists.
     *
     * @param trackIds The list of track ids.
     */
    public void deleteTrackArtistAssociation(List<Long> trackIds) {
        for (TrackArtistLinkTableEnum link : TrackArtistLinkTableEnum.values()) {
            // Generating the request and executing it.
            jdbcTemplate.update(link.getDeleteRequestWithParams(trackIds.size()), trackIds);
        }
    }

    /**
     * Associate the track with the corresponding artist.
     *
     * @param tracks The information about the tracks to be inserted in the database.
     */
    public void associateTracksToLyricist(List<TrackIntegrationDto> tracks) {
        for (TrackArtistLinkTableEnum link : TrackArtistLinkTableEnum.values()) {
            jdbcTemplate.batchUpdate(link.getInsertRequest());
            // Fixme: associate each table with the good values.
        }
    }
}
