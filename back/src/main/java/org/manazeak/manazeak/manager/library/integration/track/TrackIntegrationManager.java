package org.manazeak.manazeak.manager.library.integration.track;

import org.manazeak.manazeak.daos.library.integration.track.TrackIntegrationDAO;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.dto.library.integration.track.TrackIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.integration.track.TrackLinkerProjection;
import org.manazeak.manazeak.entity.track.Track;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Allows to insert the scanned tracks into the database.
 */
@Component
public class TrackIntegrationManager {

    private static final int BUFFER_SIZE = 50;

    private final TrackDAO trackDao;

    private final TrackIntegrationDAO trackIntegrationDao;

    public TrackIntegrationManager(TrackDAO trackDao, TrackIntegrationDAO trackIntegrationDao) {
        this.trackDao = trackDao;
        this.trackIntegrationDao = trackIntegrationDao;
    }


    /**
     * Merge the list of tracks into the database.
     *
     * @param tracks The list of the tracks to be merged in the database.
     */
    public void mergeTracksIntoDatabase(List<TrackIntegrationDto> tracks) {
        // Inserting all the track into the database.
        trackIntegrationDao.mergeTracks(tracks);

        // Deleting the track association before updating them.


        // Linking the tracks with the artist table.

    }

    /**
     * Get all the ids from the tracks.
     *
     * @param tracksByLocation The map containing the information of the tracks.
     */
    public void fillTrackIds(Map<String, TrackIntegrationDto> tracksByLocation) {
        // Getting the location of tracks.
        List<String> locations = new ArrayList<>();
        for (String location : tracksByLocation.keySet()) {
            locations.add(location);
            if (locations.size() >= BUFFER_SIZE) {
                getIdFromLocationAndUpdateTracks(locations, tracksByLocation);
                locations.clear();
            }
        }

        if (!locations.isEmpty()) {
            getIdFromLocationAndUpdateTracks(locations, tracksByLocation);
        }

        // Filling the other tracks with generated ids.
        for (TrackIntegrationDto track : tracksByLocation.values()) {
            if (track.getTrackId() == null) {
                track.setTrackId(PkIdProvider.singleton().getNewPkId(Track.class));
            }
        }
    }

    /**
     * Get the tracks id in the database and update the id of the track of the map.
     *
     * @param locations        The locations of the tracks.
     * @param tracksByLocation The map containing the locations associated to the tracks.
     */
    private void getIdFromLocationAndUpdateTracks(List<String> locations, Map<String, TrackIntegrationDto> tracksByLocation) {
        List<TrackLinkerProjection> trackLinkers = trackDao.getTrackIdByLocation(locations);
        for (TrackLinkerProjection linker : trackLinkers) {
            tracksByLocation.get(linker.getLocation()).setTrackId(linker.getTrackId());
        }
    }

    /**
     * Deleting the association of the tracks and the artist table before inserting the tracks.
     *
     * @param tracks The list of the tracks to process.
     */
    private void deleteTrackAssociations(List<TrackIntegrationDto> tracks) {
        List<Long> trackIds = new ArrayList<>();
        for (TrackIntegrationDto track : tracks) {
            trackIds.add(track.getTrackId());
            if (trackIds.size() >= BUFFER_SIZE) {
                trackIntegrationDao.deleteTrackArtistAssociation(trackIds);
                trackIds.clear();
            }
        }

        if (!trackIds.isEmpty()) {
            trackIntegrationDao.deleteTrackArtistAssociation(trackIds);
        }
    }
}
