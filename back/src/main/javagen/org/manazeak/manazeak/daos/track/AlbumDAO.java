package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.album.AlbumContributionMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto;
import org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailGenerationProjection;
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

    /**
     * Get the basic information needed to display albums in the front.
     *
     * @param artistId The id of the artist that created the album.
     * @return The list of corresponding albums for the given artist id.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto( " +
            "alb.albumId, " +
            "alb.title, " +
            "alb.cover," +
            "alb.releaseYear) " +
            "from Album alb " +
            "where alb.artist.artistId = :artistId " +
            "order by alb.releaseDate desc")
    List<AlbumMinimalInfoDto> getMinimalAlbumByArtistId(@Param("artistId") Long artistId);

    /**
     * Get all the albums where the album has contributed.
     *
     * @param artistId The id of the artist searched.
     * @return The list of album with at least one contribution.
     */
    @Query("""
            select new org.manazeak.manazeak.entity.dto.library.album.AlbumContributionMinimalInfoDto(
               alb.albumId,
               alb.title,
               alb.cover,
               alb.releaseYear,
               comp.artistId,
               arr.artistId,
               eng.artistId,
               perf.artistId,
               lyri.artistId
            ) from Track trk
            left join trk.composerList comp on comp.artistId = :artistId
            left join trk.arrangerList arr on arr.artistId = :artistId
            left join trk.engineerList eng on eng.artistId = :artistId
            left join trk.performerList perf on perf.artistId = :artistId
            left join trk.lyricistList lyri on lyri.artistId = :artistId
            join trk.album alb
            where alb.artist.artistId <> :artistId
            and (
                perf.artistId = :artistId
                or eng.artistId = :artistId
                or arr.artistId = :artistId
                or comp.artistId = :artistId
                or lyri.artistId = :artistId
            )
            group by alb.albumId, alb.title, alb.cover, alb.releaseYear, comp.artistId, arr.artistId, eng.artistId,
            perf.artistId, lyri.artistId
            order by alb.releaseDate desc
            """)
    List<AlbumContributionMinimalInfoDto> getMinimalAlbumContributionByArtistId(@Param("artistId") Long artistId);

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
            "alb.endRecordingDate," +
            "comp.code) from Album alb " +
            "join alb.artist art " +
            "left join alb.label lab " +
            "left join alb.compilationType comp " +
            "where alb.albumId = :albumId")
    Optional<AlbumDetailsDto> getAlbumDetailsById(@Param("albumId") Long albumId);

    @Query("select " +
            "   albumId as elementId, " +
            "   location as name " +
            "from Album " +
            "where albumId > :lastAlbumId " +
            "order by albumId")
    List<ThumbnailGenerationProjection> getAlbumThumbsGenerations(@Param("lastAlbumId") Long lastAlbumId, Pageable pageable);

    @Query("select new org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto(" +
            "alb.albumId," +
            "alb.title," +
            "alb.cover," +
            "alb.releaseYear) " +
            "from Album alb " +
            "where alb.label.labelId = :labelId")
    List<AlbumMinimalInfoDto> getMinimalAlbumsByLabelId(@Param("labelId") Long labelId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT