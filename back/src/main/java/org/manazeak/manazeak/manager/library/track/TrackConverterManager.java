package org.manazeak.manazeak.manager.library.track;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackQueueInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackWithPartialPerformerDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.mapper.library.track.TrackMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the converter used to convert complete track from the database to track
 * displayable on the UI.
 */
@Component
@RequiredArgsConstructor
public class TrackConverterManager {

    private final TrackMapper trackMapper;

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
        return tracks.getLast();
    }

    /**
     * Convert the partial track into a track to be displayed into the queue.
     *
     * @param tracks The track information coming from the database.
     * @return The list of elements.
     */
    public List<TrackQueueInfoDto> convertTrackPartialPerformerToTrackQueueInfo(List<TrackWithPartialPerformerDto> tracks) {
        List<TrackQueueInfoDto> convertedTracks = new ArrayList<>();
        Long lastId = 0L;
        for (TrackWithPartialPerformerDto track : tracks) {
            // Converting the track if it hasn't been converted.
            if (!lastId.equals(track.trackId())) {
                lastId = track.trackId();
                convertedTracks.add(trackMapper.trackWithPartialPerformerToTrackQueueInfo(track));
            } else {
                // Adding the performer.
                convertedTracks.getLast().getPerformers().add(track.performer());
            }
        }

        return convertedTracks;
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
            // If the track is new, resetting the last ids.
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
