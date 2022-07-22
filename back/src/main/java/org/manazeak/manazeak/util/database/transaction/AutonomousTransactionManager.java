package org.manazeak.manazeak.util.database.transaction;


/**
 * Allows to handle a new transaction to avoid the rollback in some cases.
 */
public interface AutonomousTransactionManager {

    /**
     * Launch a runnable in a different transaction.
     *
     * @param runnable The operation to launch.
     */
    void runInTransaction(Runnable runnable);

}
