package org.manazeak.manazeak.manager.library.integration.random;

import org.manazeak.manazeak.daos.library.integration.random.AbstractRandomInit;
import org.manazeak.manazeak.daos.library.integration.random.artist.RandomReleaseArtistInitDAO;
import org.manazeak.manazeak.daos.library.integration.random.genre.RandomGenreInitDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Handles the random management of the application.
 */
@Component
public class RandomInitializationManager {

    private static final Logger LOG = LoggerFactory.getLogger(RandomInitializationManager.class);

    private final List<AbstractRandomInit> randomInitializers;

    public RandomInitializationManager(RandomReleaseArtistInitDAO randomReleaseArtistInitDAO, RandomGenreInitDAO randomGenreInitDAO) {
        randomInitializers = new ArrayList<>();
        randomInitializers.add(randomReleaseArtistInitDAO);
        randomInitializers.add(randomGenreInitDAO);
    }

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