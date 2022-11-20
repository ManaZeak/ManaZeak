package org.manazeak.manazeak.service.track;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.track.Track;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.springframework.stereotype.Service;

/**
 * Allows to handle the tracks of the application.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackDAO trackDAO;


    /**
     * Get a track with its id. Throws an exception if the track doesn't exists.
     *
     * @param trackId The id of the track.
     * @return The track.
     */
    public Track getTrackById(Long trackId) {
        return trackDAO.findById(trackId)
                .orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("user.track.not_found"));
    }

}
