package org.manazeak.manazeak.daos.random;

import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.random.RandomMinMaxProjection;
import org.manazeak.manazeak.entity.random.RandomGenre;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * Data Access Object for RandomGenre using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface RandomGenreDAO extends CrudRepository<RandomGenre, Long> {

    /**
     * @return Get the minimum and the maximum index of the random table.
     */
    @Query("select min(randomIndex) as minIndex, max(randomIndex) as maxIndex from RandomGenre")
    RandomMinMaxProjection getRandomReleaseGenreMinMax();

    /**
     * Get a list of random genre from the database.
     *
     * @param indexIds The ids of the index of the genre in the database.
     * @return The genre matching the index.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto(" +
            "gen.genreId," +
            "gen.name," +
            "gen.pictureFilename) " +
            "from RandomGenre rand " +
            "join rand.genre gen " +
            "where rand.randomIndex in (:indexIds)")
    List<GenreMinimalInfoDto> getListMinimalInfoByIndexes(@Param("indexIds") Set<Long> indexIds);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT