package org.manazeak.manazeak.mock;

import org.manazeak.manazeak.util.database.transaction.AutonomousTransactionManager;
import org.springframework.stereotype.Component;

/**
 * No autonomous transaction for tests.
 */
@Component
public class AutonomousTransactionManagerMock implements AutonomousTransactionManager {

    @Override
    public void runInTransaction(final Runnable runnable) {
        runnable.run();
    }

}
