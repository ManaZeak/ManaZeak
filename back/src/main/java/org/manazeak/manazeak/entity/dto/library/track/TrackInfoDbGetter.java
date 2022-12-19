package org.manazeak.manazeak.entity.dto.library.track;

/**
 * Contains all the fields needed to generate the track complete info dto.
 */
public interface TrackInfoDbGetter {

    String getTitle();

    String getDuration();

    String getIsrcEan();

    Long getRecordingLocationId();

    String getRecordingLocation();

    String getBpm();

    String getKey();

    Long getKeyId();

    Long getPerformerId();

    String getPerformerName();

    String getPerformerPicture();

    boolean getPerformerIsLabel();

    Long getGenreId();

    String getGenreName();

    String getGenrePicture();

    Long getComposerId();

    String getComposerName();

    String getComposerPicture();

    boolean getComposerIsLabel();

    Long getLyricistId();

    String getLyricistName();

    String getLyricistPicture();

    boolean getLyricistIsLabel();

    Long getProducerId();

    String getProducerName();

    String getProducerPicture();

    boolean getProducerIsLabel();

    Long getEngineerId();

    String getEngineerName();

    String getEngineerPicture();

    boolean getEngineerIsLabel();

}
