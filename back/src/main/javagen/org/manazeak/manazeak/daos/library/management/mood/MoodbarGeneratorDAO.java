package org.manazeak.manazeak.daos.library.management.mood;

import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Fetch the information needed to generate the moodbar of the application tracks.
 */
@Repository
@RequiredArgsConstructor
public class MoodbarGeneratorDAO {

    private static final String SQL_UPDATE_TRACK_WITH_MOODBAR = "update track set mood = ? where track_id = ?";

    private final JdbcTemplate jdbcTemplate;

    /**
     * Insert a list of covers into the database.
     *
     * @param moodbars The covers to be inserted into
     */
    public void insertMoodbars(List<Pair<Long, String>> moodbars) {
        jdbcTemplate.batchUpdate(SQL_UPDATE_TRACK_WITH_MOODBAR, new MoodbarSetter(moodbars));
    }

    /**
     * Setter for the moodbar request.
     * @param moodbars The list of moodbars to apply.
     */
    private record MoodbarSetter(List<Pair<Long, String>> moodbars) implements BatchPreparedStatementSetter {

        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            ps.setString(1, moodbars.get(i).getSecond());
            ps.setLong(2, moodbars.get(i).getFirst());
        }

        @Override
        public int getBatchSize() {
            return moodbars.size();
        }
    }

}
