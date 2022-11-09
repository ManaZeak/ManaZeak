package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.daos.track.*;
import org.manazeak.manazeak.util.database.transaction.AutonomousTransactionManager;
import org.springframework.stereotype.Component;

/**
 * Allows to wipe the data contained inside the library.
 */
@Component
public class LibraryWiperManager {

    private final TrackDAO trackDao;

    private final GenreDAO genreDao;

    private final AlbumDAO albumDao;

    private final LabelDAO labelDao;

    private final BioDAO bioDao;

    private final ArtistDAO artistDao;

    private final BandMemberDAO bandMemberDAO;

    private final RandomReleaseArtistDAO randomReleaseArtistDAO;

    private final AutonomousTransactionManager transactionManager;

    public LibraryWiperManager(TrackDAO trackDao, GenreDAO genreDao, AlbumDAO albumDao,
                               LabelDAO labelDAO, BioDAO bioDao, ArtistDAO artistDao, BandMemberDAO bandMemberDAO, RandomReleaseArtistDAO randomReleaseArtistDAO, AutonomousTransactionManager transactionManager) {
        this.trackDao = trackDao;
        this.genreDao = genreDao;
        this.albumDao = albumDao;
        this.labelDao = labelDAO;
        this.bioDao = bioDao;
        this.artistDao = artistDao;
        this.bandMemberDAO = bandMemberDAO;
        this.randomReleaseArtistDAO = randomReleaseArtistDAO;
        this.transactionManager = transactionManager;
    }

    /**
     * Delete all the data contained inside the library in the database.
     */
    public void wipeLibraryData() {
        // We have to force hibernate to use a different transaction, or else the integration wait for the commit forever.
        transactionManager.runInTransaction(() -> {
            trackDao.deleteAll();
            genreDao.deleteAll();
            albumDao.deleteAll();
            bandMemberDAO.deleteAll();
            randomReleaseArtistDAO.deleteAll();
            artistDao.deleteAll();
            bioDao.deleteAll();
            labelDao.deleteAll();
        });

    }

}
