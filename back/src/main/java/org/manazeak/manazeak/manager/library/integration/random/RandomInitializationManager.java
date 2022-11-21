package org.manazeak.manazeak.manager.library.integration.random;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.library.integration.random.AbstractRandomInit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Handles the random management of the application.
 */
@Component
@RequiredArgsConstructor
public class RandomInitializationManager {

    private static final Logger LOG = LoggerFactory.getLogger(RandomInitializationManager.class);

    private final List<AbstractRandomInit> randomInitializers;

    /**
     * Reset and initialise all the random tables.
     */
    public void initRandomTables() {
        LOG.info("Starting the initialisation of all the randoms of the application.");

        // Iterating through the initializer.
        for (AbstractRandomInit randomInit : randomInitializers) {
            randomInit.initRandomTable();
        }

        LOG.info("Ending the initialisation of all the randoms of the application.");
    }
}
