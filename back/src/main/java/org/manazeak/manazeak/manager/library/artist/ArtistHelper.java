package org.manazeak.manazeak.manager.library.artist;

import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.track.Artist;

/**
 * Helper class for the artists.
 */
public final class ArtistHelper {

    private ArtistHelper() {
    }

    /**
     * Convert an artist from the database into a minimal artist.
     * @param artist The artist object.
     * @return The minimal artist.
     */
    public static ArtistMinimalInfoDto convertArtist(Artist artist) {
        ArtistMinimalInfoDto minimal = new ArtistMinimalInfoDto();
        minimal.setId(artist.getArtistId());
        minimal.setName(artist.getName());
        minimal.setLabel(artist.getIsLabel());
        // FIXME: add the cover to the artist object.

        return minimal;
    }
}
