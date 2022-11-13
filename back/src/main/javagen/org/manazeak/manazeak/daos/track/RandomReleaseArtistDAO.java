package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.random.RandomMinMaxProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.manazeak.manazeak.entity.track.RandomReleaseArtist;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * Data Access Object for RandomReleaseArtist using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface RandomReleaseArtistDAO extends CrudRepository<RandomReleaseArtist, Long> {

    /**
     * @return Get the minimum and the maximum index of the random table.
     */
    @Query("select min(randomIndex) as minIndex, max(randomIndex) as maxIndex from RandomReleaseArtist")
    RandomMinMaxProjection getRandomReleaseArtistMinMax();

    /**
     * Get a list of random artists from the database.
     * @param indexIds The list of index ids that will be fecthed.
     * @return The list of minimal artist info to display.
     */
    @Query("select new org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto(" +
            "art.artistId," +
            "art.name," +
            "art.pictureFilename," +
            "art.isLabel) " +
            "from RandomReleaseArtist rand " +
            "join rand.artist art " +
            "where rand.randomIndex in (:indexIds)")
    List<ArtistMinimalInfoDto> getListMinimalInfoByIndexes(@Param("indexIds") Set<Long> indexIds);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT