package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.artist.ArtistDetailsDto;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
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
            "   a.pictureFilename, " +
            "   bio.text" +
            ") " +
            "FROM Artist a " +
            "LEFT JOIN a.country country " +
            "LEFT JOIN a.label label " +
            "LEFT JOIN a.bio bio " +
            "WHERE a.artistId = :artistId")
    Optional<ArtistDetailsDto> getArtistDetailById(@Param("artistId") Long artistId);

    /**
     * @return All the release artist of the application.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto(" +
            "art.artistId," +
            "art.name," +
            "art.pictureFilename," +
            "art.isLabel) from Artist art " +
            "where art.location is not null " +
            "order by art.name")
    List<ArtistMinimalInfoDto> getAllReleaseArtistMinimalInfo();

    /**
     * Get all the performer of an album.
     *
     * @param albumId The id of the album.
     * @return The list of performers on the album.
     */
    @Query("select distinct new org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto(" +
            "perf.artistId," +
            "perf.name," +
            "perf.pictureFilename," +
            "perf.isLabel) " +
            "from Track trk " +
            "join trk.performerList perf " +
            "where trk.album.albumId = :albumId " +
            "order by perf.name")
    List<ArtistMinimalInfoDto> getAlbumPerformers(@Param("albumId") Long albumId);

    /**
     * Get the list of artist having an album released by a label.
     *
     * @param labelId The identifier of the label.
     * @return The list of artist released by this label.
     */
    @Query("select distinct new org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto(" +
            "art.artistId," +
            "art.name," +
            "art.pictureFilename," +
            "art.isLabel) " +
            "from Album alb " +
            "join alb.artist art " +
            "where alb.label.labelId = :labelId")
    List<ArtistMinimalInfoDto> getArtistFromLabelId(@Param("labelId") Long labelId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT