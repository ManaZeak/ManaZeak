package org.manazeak.manazeak.daos.random;

import org.manazeak.manazeak.entity.dto.library.label.LabelMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.random.RandomMinMaxProjection;
import org.manazeak.manazeak.entity.random.RandomLabel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * Data Access Object for RandomLabel using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface RandomLabelDAO extends JpaRepository<RandomLabel, Long> {


    /**
     * @return Get the minimum and the maximum index of the random table.
     */
    @Query("select min(randomIndex) as minIndex, max(randomIndex) as maxIndex from RandomLabel")
    RandomMinMaxProjection getRandomReleaseGenreMinMax();

    /**
     * Get a list of random labels from the database.
     *
     * @param indexIds The random index of the label in the database.
     * @return The genre matching the random indexes.
     */
    @Query("""
            select new org.manazeak.manazeak.entity.dto.library.label.LabelMinimalInfoDto(
                lab.labelId,
                lab.name,
                lab.pictureFilename
            )
            from RandomLabel rand
            join rand.label lab
            where rand.randomIndex in (:indexIds)
            """)
    List<LabelMinimalInfoDto> getListMinimalInfoByIndexes(@Param("indexIds") Set<Long> indexIds);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT