package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.artist.ArtistDetailsDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistLinkerProjection;
import org.manazeak.manazeak.entity.track.Artist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
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

    /**
     * Get the detail about an artist except the band members.
     *
     * @return The artist detail.
     */
    @Query("SELECT new org.manazeak.manazeak.entity.dto.library.artist.ArtistDetailsDto(" +
            "   a.artistId, " +
            "   a.name, " +
            "   a.location, " +
            "   a.birthDate, " +
            "   a.deathDate, " +
            "   a.isLabel, " +
            "   a.testimonyFrom, " +
            "   a.testimonyText, " +
            "   country.trigram, " +
            "   label.labelId, " +
            "   label.name, " +
            "   bio.text" +
            ") " +
            "FROM Artist a " +
            "LEFT JOIN a.country country " +
            "LEFT JOIN a.label label " +
            "LEFT JOIN a.bio bio " +
            "WHERE a.artistId = :artistId")
    Optional<ArtistDetailsDto> getArtistDetailById(@Param("artistId") Long artistId);

    /**
     * Get the information about the member of an artist.
     *
     * @param artistId The artist id of the parent.
     * @return The information about the members of the artist.
     */
    @Query("SELECT a.memberList " +
            "FROM Artist a " +
            "WHERE a.artistId = :artistId")
    List<Artist> getArtistMinimalInfoByParent(Long artistId);

    /**
     * Get all the artist with a not null location.
     *
     * @return The artists with a location.
     */
    List<Artist> getArtistByLocationNotNull();

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT