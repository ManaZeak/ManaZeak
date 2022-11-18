package org.manazeak.manazeak.daos.library.wiper;

import org.manazeak.manazeak.constant.library.LibraryTablesEnum;
import org.manazeak.manazeak.util.database.transaction.AutonomousTransactionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Locale;

/**
 * Wipe all the tables of the application.
 */
@Repository
public class LibraryWiperDAO {

    private static final String TRUNCATE_REQUEST = "TRUNCATE TABLE ";

    private static final Logger LOG = LoggerFactory.getLogger(LibraryWiperDAO.class);

    private final JdbcTemplate jdbcTemplate;

    private final AutonomousTransactionManager autonomousTransactionManager;

    public LibraryWiperDAO(JdbcTemplate jdbcTemplate, AutonomousTransactionManager autonomousTransactionManager) {
        this.jdbcTemplate = jdbcTemplate;
        this.autonomousTransactionManager = autonomousTransactionManager;
    }

    public void wipeLibraryData() {
        for (LibraryTablesEnum table : LibraryTablesEnum.values()) {
            autonomousTransactionManager.runInTransaction(() -> {
                String tableName = table.name().toLowerCase(Locale.ENGLISH);
                LOG.info(tableName);
                jdbcTemplate.update(TRUNCATE_REQUEST + tableName);
            });
        }
    }

}
