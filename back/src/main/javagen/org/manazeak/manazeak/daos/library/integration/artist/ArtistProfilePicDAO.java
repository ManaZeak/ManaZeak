package org.manazeak.manazeak.daos.library.integration.artist;

import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistPictureProjection;
import org.manazeak.manazeak.entity.track.Artist;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Allows to select the artists in the database to avoid selecting all the table at once.
 */
public interface ArtistProfilePicDAO extends Repository<Artist, Long> {

    /**
     * Get a packet of artists without any thumb generated in the database.
     *
     * @param lastArtistId The last id of artist found in the previous packet.
     * @param pageable     The pageable object to handle the pagination for the request.
     * @return The artists with no image generated.
     */
    @Query("select artistId as id, name as name from Artist where" +
            " pictureFilename is null and artistId > :lastArtistId " +
            "ORDER BY artistId")
    List<ArtistPictureProjection> getArtistsToGenerateThumbPacket(@Param("lastArtistId") Long lastArtistId, Pageable pageable);

}
