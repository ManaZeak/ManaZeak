package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.genre.GenreCompleteInfoDbDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenreLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailGenerationProjection;
import org.manazeak.manazeak.entity.track.Genre;
import org.springframework.data.domain.Pageable;
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

    @Query("""
            select genreId as elementId, name as name
            from Genre where genreId > :lastGenreId
            order by genreId
            """)
    List<ThumbnailGenerationProjection> getGenresPictureProjection(@Param("lastGenreId") Long lastGenreId, Pageable pageable);

    @Query("""
            select new org.manazeak.manazeak.entity.dto.library.genre.GenreCompleteInfoDbDto(
                trk.trackId,
                trk.title,
                trk.duration,
                trk.isrc,
                trk.bpm,
                trk.mood,
                keys.label,
                keys.keyId,
                perf.artistId,
                perf.name,
                perf.pictureFilename,
                perf.isLabel,
                genre.genreId,
                genre.name,
                genre.pictureFilename,
                comp.artistId,
                comp.name,
                comp.pictureFilename,
                comp.isLabel,
                lyr.artistId,
                lyr.name,
                lyr.pictureFilename,
                lyr.isLabel,
                pro.artistId,
                pro.name,
                pro.pictureFilename,
                pro.isLabel,
                eng.artistId,
                eng.name,
                eng.pictureFilename,
                eng.isLabel,
                art.artistId,
                art.name,
                art.isLabel,
                art.pictureFilename,
                alb.albumId,
                alb.title,
                alb.cover,
                alb.releaseDate
            )
            from Track trk
            join trk.album alb
            left join trk.keyList keys
            left join trk.performerList perf
            left join trk.genreList genre
            left join trk.composerList comp
            left join trk.lyricistList lyr
            left join trk.producerList pro
            left join trk.engineerList eng
            join alb.artist art
            join trk.genreList genres
            where genres.genreId = :genreId
            order by art.name, alb.releaseDate, trk.discNumber, trk.trackNumber
            """)
    List<GenreCompleteInfoDbDto> getGenreCompleteInfoByGenreId(@Param("genreId") Long genreId);

    @Query("""
            select new org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto(
                gen.genreId,
                gen.name,
                gen.pictureFilename
            )
            from Genre gen
            order by gen.name
            """)
    List<GenreMinimalInfoDto> getAllMinimalGenre();

    /**
     * Get the information of the genre.
     *
     * @param genreId The id of the genre.
     * @return The information about the genre in the database.
     */
    @Query("""
            select new org.manazeak.manazeak.entity.dto.library.genre.GenreCompleteInfoDto(
            genreId,
            name,
            pictureFilename)
            from Genre
            where genreId = :genreId
            """)
    Optional<GenreCompleteInfoDto> getGenreDetail(@Param("genreId") Long genreId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT