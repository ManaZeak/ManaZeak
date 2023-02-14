package org.manazeak.manazeak.manager.library.track;

import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the converter used to convert complete track from the database to track
 * displayable on the UI.
 */
@Component
public class TrackCompleteConverterManager {

    /**
     * Get the last track in the track table.
     *
     * @param tracks The list of the tracks.
     * @return The last track if the list is not empty, null otherwise.
     */
    private static TrackCompleteInfoDto getLastTrack(List<TrackCompleteInfoDto> tracks) {
        if (tracks.isEmpty()) {
            throw new MzkRuntimeException("The list of track cannot be empty.");
        }
        return tracks.get(tracks.size() - 1);
    }

    /**
     * Converts the tracks that have been provided by the database to displayable objects.
     *
     * @param dbTracks The tracks contained in the database.
     * @return The list of tracks that have been aggregated correctly.
     */
    public List<TrackCompleteInfoDto> convertTrackCompleteInfoDbToTrackCompleteInfo(List<TrackCompleteInfoDbDto> dbTracks) {
        Long lastTrackId = 0L;
        List<TrackCompleteInfoDto> tracks = new ArrayList<>();
        // Iterating through the tracks of the database and building objects.
        for (TrackCompleteInfoDbDto dbTrack : dbTracks) {
            // If the track is a new one resetting the last ids.
            if (!lastTrackId.equals(dbTrack.getTrackId())) {
                tracks.add(dbTrack.getTrackBasicInfo());
                lastTrackId = dbTrack.getTrackId();
            }
            TrackCompleteInfoDto currentTrack = getLastTrack(tracks);
            // Adding the performer.
            TrackCompleteInfoHelper.fillTrackInfo(dbTrack, currentTrack);
        }

        return tracks;
    }
}
