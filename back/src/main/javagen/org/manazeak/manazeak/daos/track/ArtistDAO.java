package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.artist.ArtistLinkerProjection;
import org.manazeak.manazeak.entity.track.Artist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Data Access Object for Artist using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface ArtistDAO extends CrudRepository<Artist, Long> {

    /**
     * Get the artist id from the artist name.
     *
     * @param artistNames The list of the name of the artists.
     * @return The artist name linked to the artist ID.
     */
    @Query("select artistId, name as artistName from Artist where name in :artistNames")
    List<ArtistLinkerProjection> getArtistByNames(@Param("artistNames") Collection<String> artistNames);

    /**
     * Get the artists by the locations.
     *
     * @param locations The locations of the bands.
     * @return The bands corresponding to the locations.
     */
    @Query("SELECT a FROM Artist a WHERE a.location IN (:locations)")
    List<Artist> getArtistByLocations(@Param("locations") Set<String> locations);


}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT