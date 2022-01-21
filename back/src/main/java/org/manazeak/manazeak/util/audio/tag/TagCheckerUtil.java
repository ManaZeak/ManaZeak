package org.manazeak.manazeak.util.audio.tag;

/**
 * Some generic checks on the track tags.
 */
public class TagCheckerUtil {

    private static final String RECORD_SUFFIX = " Records";

    private TagCheckerUtil() {

    }

    /**
     * @param artistName The name of the artist.
     * @return true if the artist is a record.
     */
    public static boolean isArtistRecord(String artistName) {
        if (artistName == null) {
            return false;
        }
        // If the artist name finishes by the record suffix, it's a record.
        return artistName.endsWith(RECORD_SUFFIX);
    }

}
