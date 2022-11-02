package org.manazeak.manazeak.constant.library;

/**
 * Contains the possible status of a library scan.
 */
public enum ScanStepEnum {
    CLEARING_LIBRARY(1L),
    ENUMERATING_FILES(2L),
    INTEGRATION(3L),
    TRACK_COVER_EXTRACTION(4L),
    ARTIST_PICTURE_EXTRACTION(5L),
    LABEL_PICTURE_EXTRACTION(7L),
    GENRE_PICTURE_EXTRACTION(8L),
    DONE(6L);

    private final Long scanStatusId;

    ScanStepEnum(Long scanStatusId) {
        this.scanStatusId = scanStatusId;
    }

    public Long getStepId() {
        return scanStatusId;
    }

}
