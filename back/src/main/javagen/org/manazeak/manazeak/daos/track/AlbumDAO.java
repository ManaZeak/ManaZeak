package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto;
import org.manazeak.manazeak.entity.dto.library.album.AlbumInfoArtistViewDto;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumCoverLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumCoverUpdateProjection;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumLinkerProjection;
import org.manazeak.manazeak.entity.track.Album;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Album using Spring CrudRepository interface
 * This file has been automatically generated
 */
public interface AlbumDAO extends CrudRepository<Album, Long> {

    /**
     * Get the artist id from the artist name.
     *
     * @param albumLocations The list of the locations of the albums.
     * @return The album title linked to the album ID.
     */
    @Query("select location as albumLocation, albumId from Album where location in (:albumLocations)")
    List<AlbumLinkerProjection> getAlbumsByLocations(@Param("albumLocations") Collection<String> albumLocations);

    @Query("select albumId as albumId, location as albumLocation from Album where location in (:locations)")
    List<AlbumCoverLinkerProjection> getAlbumByLocations(@Param("locations") Collection<String> location);

    /**
     * Get the basic information needed to display albums in the front.
     *
     * @param artistId The id of the artist that created the album.
     * @return The list of corresponding albums for the given artist id.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.album.AlbumInfoArtistViewDto( " +
            "alb.albumId, " +
            "alb.title, " +
            "alb.cover," +
            "alb.releaseYear) " +
            "from Album alb " +
            "where alb.artist.artistId = :artistId " +
            "order by alb.releaseDate desc")
    List<AlbumInfoArtistViewDto> getMinimalAlbumByArtistId(@Param("artistId") Long artistId);

    /**
     * Get the detail of an album from the database.
     *
     * @param albumId The id of the album.
     * @return The details of the album.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto(" +
            "alb.albumId," +
            "alb.title," +
            "alb.cover," +
            "alb.totalTrack," +
            "art.artistId," +
            "art.name," +
            "art.pictureFilename," +
            "alb.releaseDate," +
            "lab.labelId," +
            "lab.name," +
            "alb.duration," +
            "alb.catalogNumber," +
            "alb.eanUpn," +
            "alb.startRecordingDate," +
            "alb.endRecordingDate) from Album alb " +
            "join alb.artist art " +
            "join alb.label lab " +
            "where alb.albumId = :albumId")
    Optional<AlbumDetailsDto> getAlbumDetailsById(@Param("albumId") Long albumId);

    @Query("select " +
            "   albumId as id, " +
            "   location as albumLocation " +
            "from Album " +
            "where albumId > :lastAlbumId " +
            "order by albumId")
    List<AlbumCoverUpdateProjection> getAlbumsLocationAndCoverName(@Param("lastAlbumId") Long lastAlbumId, Pageable pageable);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT