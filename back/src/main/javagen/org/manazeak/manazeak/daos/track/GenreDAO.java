package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.integration.genre.GenreLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenrePictureProjection;
import org.manazeak.manazeak.entity.track.Genre;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

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

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT