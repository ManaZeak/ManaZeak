package org.manazeak.manazeak.daos.library.integration.random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Contains the methods needed to init a random table.
 */
public abstract class AbstractRandomInit {

    private static final String RESET_SEQUENCE_START = "ALTER SEQUENCE ";

    private static final String RESET_SEQUENCE_END = " RESTART";

    private static final String TRUNCATE_TABLE = "TRUNCATE TABLE ";

    private static final Logger LOG = LoggerFactory.getLogger(AbstractRandomInit.class);

    private final JdbcTemplate jdbcTemplate;

    protected AbstractRandomInit(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Init the table containing the data needed to get random elements of the database.
     */
    public void initRandomTable() {
        LOG.info("START - Deleting data for the table {}.", getTableName());
        // Dropping the data in the table containing the random.
        jdbcTemplate.update(TRUNCATE_TABLE + getTableName());
        LOG.info("END - Deleting data for the table {}.", getTableName());


        LOG.info("START - resetting the sequence {}.", getSequenceName());
        // Resetting the sequence.
        jdbcTemplate.update(RESET_SEQUENCE_START + getSequenceName() + RESET_SEQUENCE_END);
        LOG.info("END - resetting the sequence {}.", getSequenceName());

        LOG.info("START - Adding values to the random table {}.", getTableName());
        // Init the random with the data.
        jdbcTemplate.update(getInitRequest());
        LOG.info("END - Adding values to the random table {}.", getTableName());
    }

    /**
     * @return Get the request needed to init the random table.
     */
    protected abstract String getInitRequest();

    /**
     * @return Get the sequence name.
     */
    protected abstract String getSequenceName();

    /**
     * @return The table name containing the random.
     */
    protected abstract String getTableName();
}
