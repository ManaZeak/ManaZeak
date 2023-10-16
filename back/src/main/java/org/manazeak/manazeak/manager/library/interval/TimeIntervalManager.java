package org.manazeak.manazeak.manager.library.interval;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.TimeIntervalDAO;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class TimeIntervalManager {

    private final TimeIntervalDAO timeIntervalDAO;

    /**
     * Create a map linking the time interval key to its identifier.
     *
     * @param intervals The intervals to fetch from the database.
     * @return The map associating the interval string to its identifier in the database.
     */
    public Map<String, Long> getTimeIntervalMap(Set<String> intervals) {
        List<NameIdentifierProjection> fetchedTimeIntervals = timeIntervalDAO.getTimeIntervalsByKeys(intervals);

        // Building the map with the result.
        HashMap<String, Long> timeIntervalMap = new HashMap<>();
        for (NameIdentifierProjection fetchInterval : fetchedTimeIntervals) {
            timeIntervalMap.put(fetchInterval.getName(), fetchInterval.getIdentifier());
        }

        return timeIntervalMap;
    }

}
