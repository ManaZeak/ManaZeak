package org.manazeak.manazeak.constant.library.track;

import org.manazeak.manazeak.exception.MzkRuntimeException;

/**
 * Contains the information about the table that links the artists and the tracks.
 */
public enum TrackLinkTableEnum {

    LYRICIST("track_lyricist"),
    ENGINEER("track_engineer"),
    ARRANGER("track_arranger"),
    PRODUCER("track_producer"),
    PERFORMER("track_performer"),
    COMPOSER("track_composer"),
    ARTIST("track_band_artist"),
    GENRE("track_genre", " (track_id, genre_id) VALUES (?, ?)"),
    KEY("track_key", " (track_id, key_id) VALUES (?, ?)");


    private static final String SQL_DELETE_START = "DELETE FROM ";

    private static final String SQL_INSERT_START = "INSERT INTO ";

    private static final String SQL_INSERT_ARTIST_END = " (track_id, artist_id) VALUES (?, ?)";

    private static final String WHERE = " WHERE track_id IN (";

    private static final char END_REQUEST = ')';

    private static final char SQL_PARAM = '?';

    private static final char SEPARATOR = ',';


    private final String tableName;

    private final String insertRequest;


    TrackLinkTableEnum(String tableName) {
        this.tableName = tableName;
        insertRequest = SQL_INSERT_START + tableName + SQL_INSERT_ARTIST_END;
    }

    TrackLinkTableEnum(String tableName, String insertEnd) {
        this.tableName = tableName;
        insertRequest = SQL_INSERT_START + tableName + insertEnd;
    }

    public String getInsertRequest() {
        return insertRequest;
    }

    /**
     * Generate a request containing the params as ?.
     *
     * @param numberParams The number of params to generate.
     * @return The SQL generated with the number of params.
     */
    public String getDeleteRequestWithParams(int numberParams) {
        // Checking if the number of params is possible.
        if (numberParams <= 0) {
            throw new MzkRuntimeException("Invalid number of params for generating the request.");
        }

        // Building the SQL request.
        StringBuilder request = new StringBuilder(SQL_DELETE_START);
        request.append(tableName);
        request.append(WHERE);
        for (int i = 0; i < numberParams; ++i) {
            request.append(SQL_PARAM);
            if (i != numberParams - 1) {
                request.append(SEPARATOR);
            }
        }
        request.append(END_REQUEST);

        return request.toString();
    }
}
