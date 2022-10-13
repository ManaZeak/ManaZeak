package org.manazeak.manazeak.entity.dto.library.integration.track;

/**
 * Used to link the track id with its location.
 */
public interface TrackLinkerProjection {

    /**
     * @return The location of the track in the FS.
     */
    String getLocation();

    /**
     * @return The track id in the database.
     */
    Long getTrackId();

}
