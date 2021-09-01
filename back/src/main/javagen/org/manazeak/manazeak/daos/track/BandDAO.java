package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.track.Band;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

/**
 * Data Access Object for Band using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface BandDAO extends CrudRepository<Band, Long> {

    /**
     * Get the bands by the locations.
     *
     * @param locations The locations of the bands.
     * @return The bands corresponding to the locations.
     */
    @Query("SELECT b FROM Band b WHERE b.location IN (:locations)")
    List<Band> getBandByLocations(@Param("locations") Set<String> locations);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT