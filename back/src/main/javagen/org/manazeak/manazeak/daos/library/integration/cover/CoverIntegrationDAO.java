package org.manazeak.manazeak.daos.library.integration.cover;

import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Integrate the cover information into the database.
 */
@Repository
public class CoverIntegrationDAO {

    private static final String SQL_ALBUM_COVER_UPDATE = "update album set cover = ? where album_id = ?";

    private final JdbcTemplate jdbcTemplate;

    public CoverIntegrationDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Insert a list of covers into the database.
     *
     * @param covers The covers to be inserted into
     */
    public void insertCovers(List<Pair<Long, String>> covers) {
        ThumbNameUpdaterSetter thumbSetter = new ThumbNameUpdaterSetter(covers);
        jdbcTemplate.batchUpdate(SQL_ALBUM_COVER_UPDATE, thumbSetter);
    }
}
