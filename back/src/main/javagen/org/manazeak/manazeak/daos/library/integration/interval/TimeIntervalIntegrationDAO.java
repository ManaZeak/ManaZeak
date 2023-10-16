package org.manazeak.manazeak.daos.library.integration.interval;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.track.TimeInterval;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Inserts and handles the time intervals of the application.
 */
@Repository
@RequiredArgsConstructor
@Slf4j
public class TimeIntervalIntegrationDAO {

    private static final Pattern HYPHEN_PATTERN = Pattern.compile("-");

    private static final String TIME_INTERVAL_INSERT_SQL = """
            insert into time_interval (interval_id, starting_date, ending_date, interval_key) values (?, ?, ?, ?)
            """;

    private final JdbcTemplate jdbcTemplate;

    /**
     * Insert the time intervals into the database and update the container with the generated ids.
     *
     * @param container The container for the information contained in the artists JSONs.
     * @param intervals The intervals to insert into the database.
     */
    public void insertTimeIntervals(ArtistAdditionalInfoContainer container, List<String> intervals) {
        // Launching the insert request.
        jdbcTemplate.batchUpdate(TIME_INTERVAL_INSERT_SQL, new BatchPreparedStatementSetter() {

            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Long id = PkIdProvider.singleton().getNewPkId(TimeInterval.class);
                String interval = intervals.get(i);
                // Adding the interval to the container.
                container.addTimeInterval(interval, id);

                // Setting the elements into the database.
                ps.setLong(1, id);
                if (HYPHEN_PATTERN.matcher(interval).matches()) {
                    String[] splitString = HYPHEN_PATTERN.split(interval);
                    if (splitString.length > 2) {
                        log.warn("The time interval '{}' has too much parts.", interval);
                    }
                    ps.setString(2, splitString[0]);

                    // Setting the other value to null if the separator is present but not valued.
                    if (StringUtils.isEmpty(splitString[i])) {
                        ps.setNull(3, Types.VARCHAR);
                    } else {
                        ps.setString(3, splitString[1]);
                    }
                } else {
                    ps.setString(2, interval);
                }
                ps.setString(4, interval);
            }

            @Override
            public int getBatchSize() {
                return intervals.size();
            }
        });
    }

}
