package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.manazeak.manazeak.entity.track.TimeInterval;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

/**
 * Data Access Object for TimeInterval using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface TimeIntervalDAO extends CrudRepository<TimeInterval, Long> {

    /**
     * Fetch all the time intervals matching the interval keys
     *
     * @param intervals The interval key to search in the database.
     * @return The intervals found in the database.
     */
    @Query("""
            select
                intervalKey as name,
                intervalId as identifier
            from TimeInterval
            where intervalKey in :intervals
            """)
    List<NameIdentifierProjection> getTimeIntervalsByKeys(@Param("intervals") Collection<String> intervals);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT