package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.daos.library.integration.label.LabelIntegrationDAO;
import org.manazeak.manazeak.daos.track.*;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;

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

    private final LabelIntegrationDAO labelIntegrationDao;

    private final EntityManager entityManager;

    public LibraryWiperManager(TrackDAO trackDao, GenreDAO genreDao, AlbumDAO albumDao,
                               LabelDAO labelDAO, BioDAO bioDao, ArtistDAO artistDao, LabelIntegrationDAO labelIntegrationDao, EntityManager entityManager) {
        this.trackDao = trackDao;
        this.genreDao = genreDao;
        this.albumDao = albumDao;
        this.labelDao = labelDAO;
        this.bioDao = bioDao;
        this.artistDao = artistDao;
        this.labelIntegrationDao = labelIntegrationDao;
        this.entityManager = entityManager;
    }

    /**
     * Delete all the data contained inside the library in the database.
     */
    public void wipeLibraryData() {
        labelIntegrationDao.deleteAllLabels();
        entityManager.flush();
        entityManager.clear();
        trackDao.deleteAll();
        genreDao.deleteAll();
        albumDao.deleteAll();
        artistDao.deleteAll();
        bioDao.deleteAll();
        // labelDao.deleteAll();
        // Flush the JPA.
    }

}
