package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.genre.GenreArtistDetailBuilderDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenreLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenrePictureProjection;
import org.manazeak.manazeak.entity.track.Genre;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Genre using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface GenreDAO extends CrudRepository<Genre, Long> {

    /**
     * Select a list of genre inside the database.
     *
     * @param genreNames The list of genre to select.
     * @return The genre found in the database that match.
     */
    @Query("select genreId, name as genreName from Genre where name in :genreNames")
    List<GenreLinkerProjection> getGenreByNames(List<String> genreNames);

    @Query("select genreId as genreId, name as name from Genre where pictureFilename is null ")
    List<GenrePictureProjection> getGenresPictureProjection();

    @Query("select new org.manazeak.manazeak.entity.dto.library.genre.GenreArtistDetailBuilderDto(" +
            "art.artistId, " +
            "art.name," +
            "art.isLabel,  " +
            "art.pictureFilename, " +
            "alb.albumId, " +
            "alb.title, " +
            "alb.cover, " +
            "trk.trackId, " +
            "trk.title, " +
            "trk.duration) " +
            "from Track trk " +
            "join trk.genreList gen " +
            "join trk.album alb " +
            "join alb.artist art " +
            "where gen.genreId = :genreId " +
            "order by art.name, alb.title, trk.discNumber, trk.trackNumber")
    List<GenreArtistDetailBuilderDto> getGenreDetailById(@Param("genreId") Long genreId);

    @Query("select new org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto(" +
            "gen.genreId," +
            "gen.name," +
            "gen.pictureFilename) " +
            "from Genre gen")
    List<GenreMinimalInfoDto> getAllMinimalGenre();

    /**
     * Get the information of the genre.
     *
     * @param genreId The id of the genre.
     * @return The information about the genre in the database.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.genre.GenreDetailDto(" +
            "name," +
            "pictureFilename) " +
            "from Genre " +
            "where genreId = :genreId")
    Optional<GenreDetailDto> getGenreDetail(@Param("genreId") Long genreId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT