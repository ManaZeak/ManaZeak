package org.manazeak.manazeak.manager.library.integration.interval;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.library.integration.interval.TimeIntervalIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class TimeIntervalIntegrationManager {

    private final TimeIntervalIntegrationDAO timeIntervalIntegrationDAO;

    /**
     * Insert the time intervals not present in the database.
     *
     * @param container The current information about the artist JSONs.
     */
    public void insertTimeIntervals(ArtistAdditionalInfoContainer container) {
        // Creating a list of element to save into the database.
        ArrayList<String> intervals = new ArrayList<>();

        for (String interval : container.getYearsActive()) {
            if (!container.getIntervalMap().containsKey(interval)) {
                intervals.add(interval);
            }
        }

        // Inserting the intervals into the database and updating the container.
        timeIntervalIntegrationDAO.insertTimeIntervals(container, intervals);
    }
}
