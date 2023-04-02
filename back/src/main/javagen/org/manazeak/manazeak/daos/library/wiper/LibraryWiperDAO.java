package org.manazeak.manazeak.daos.library.wiper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.library.LibraryTablesEnum;
import org.manazeak.manazeak.util.database.transaction.AutonomousTransactionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Wipe all the tables of the application.
 */
@Repository
@RequiredArgsConstructor
@Slf4j
public class LibraryWiperDAO {

    private static final String TRUNCATE_REQUEST = "TRUNCATE TABLE ";

    private final JdbcTemplate jdbcTemplate;
    private final AutonomousTransactionManager autonomousTransactionManager;

    public void wipeLibraryData() {
        StringBuilder sb = new StringBuilder();
        LibraryTablesEnum[] tables = LibraryTablesEnum.values();
        for (int i = 0; i < tables.length; ++i) {
            sb.append(tables[i]);
            if (i != tables.length - 1) {
                sb.append(",");
            }
        }
        log.info("Wiping the all the tables of the application.");
        autonomousTransactionManager.runInTransaction(() -> jdbcTemplate.update(TRUNCATE_REQUEST + sb));
    }

}
