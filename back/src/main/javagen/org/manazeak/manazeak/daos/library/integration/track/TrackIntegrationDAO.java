package org.manazeak.manazeak.daos.library.integration.track;

import org.manazeak.manazeak.constant.library.track.TrackLinkTableEnum;
import org.manazeak.manazeak.daos.library.integration.artist.IntegrationTrackAssociationSetter;
import org.manazeak.manazeak.entity.dto.library.integration.track.TrackIntegrationDto;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

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

    private final JdbcTemplate jdbcTemplate;

    public TrackIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Associate the track id with a set of artists id.
     *
     * @param artistsIds The artists ids.
     * @param trackId    The track id.
     */
    private static void addPairsAssociation(Long trackId, Set<Long> artistsIds, ArrayList<Pair<Long, Long>> associations) {
        if (artistsIds == null) {
            return;
        }
        for (Long artistId : artistsIds) {
            if (artistId != null) {
                associations.add(Pair.of(trackId, artistId));
            }
        }
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
     * Delete all the association between the tracks and the linked objects.
     *
     * @param trackIds The list of track ids.
     */
    public void deleteTracksAssociation(List<Long> trackIds) {
        for (TrackLinkTableEnum link : TrackLinkTableEnum.values()) {
            // Generating the request and executing it.
            jdbcTemplate.update(link.getDeleteRequestWithParams(trackIds.size()), trackIds.toArray());
        }
    }

    /**
     * Associate the track with the other elements of the application.
     *
     * @param tracks The information about the tracks to be inserted in the database.
     */
    public void associateTracksToElements(List<TrackIntegrationDto> tracks) {
        Map<TrackLinkTableEnum, ArrayList<Pair<Long, Long>>> associations = new EnumMap<>(TrackLinkTableEnum.class);
        // Filling the map with empty lists.
        for (TrackLinkTableEnum link : TrackLinkTableEnum.values()) {
            associations.put(link, new ArrayList<>());
        }
        // Generating the list of association for the different tables.
        for (TrackIntegrationDto track : tracks) {
            Long trackId = track.getTrackId();
            addPairsAssociation(trackId, track.getLyricistIds(), associations.get(TrackLinkTableEnum.LYRICIST));
            addPairsAssociation(trackId, track.getEngineerIds(), associations.get(TrackLinkTableEnum.ENGINEER));
            addPairsAssociation(trackId, track.getArrangerIds(), associations.get(TrackLinkTableEnum.ARRANGER));
            addPairsAssociation(trackId, track.getProducerIds(), associations.get(TrackLinkTableEnum.PRODUCER));
            addPairsAssociation(trackId, track.getPerformerIds(), associations.get(TrackLinkTableEnum.PERFORMER));
            addPairsAssociation(trackId, track.getComposerIds(), associations.get(TrackLinkTableEnum.COMPOSER));
            addPairsAssociation(trackId, track.getArtistIds(), associations.get(TrackLinkTableEnum.ARTIST));
            addPairsAssociation(trackId, track.getGenreIds(), associations.get(TrackLinkTableEnum.GENRE));
        }

        // Inserting the data one table at a time.
        for (TrackLinkTableEnum link : TrackLinkTableEnum.values()) {
            IntegrationTrackAssociationSetter setter = new IntegrationTrackAssociationSetter(associations.get(link));
            jdbcTemplate.batchUpdate(link.getInsertRequest(), setter);
        }
    }
}
