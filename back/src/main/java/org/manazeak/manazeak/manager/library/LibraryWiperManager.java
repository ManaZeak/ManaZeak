package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.daos.track.*;
import org.springframework.stereotype.Component;

/**
 * Allows to wipe the data contained inside the library.
 */
@Component
public class LibraryWiperManager {

    private final TrackDAO trackDao;

    private final BpmDAO bpmDao;

    private final GenreDAO genreDao;

    private final AlbumDAO albumDao;

    private final LabelDAO labelDAO;

    private final BioDAO bioDao;

    private final ArtistDAO artistDao;


    public LibraryWiperManager(TrackDAO trackDao, BpmDAO bpmDao, GenreDAO genreDao, AlbumDAO albumDao,
                               LabelDAO labelDAO, BioDAO bioDao, ArtistDAO artistDao) {
        this.trackDao = trackDao;
        this.bpmDao = bpmDao;
        this.genreDao = genreDao;
        this.albumDao = albumDao;
        this.labelDAO = labelDAO;
        this.bioDao = bioDao;
        this.artistDao = artistDao;
    }

    /**
     * Delete all the data contained inside the library in the database.
     */
    public void wipeLibraryData() {
        trackDao.deleteAll();
        bpmDao.deleteAll();
        genreDao.deleteAll();
        albumDao.deleteAll();
        artistDao.deleteAll();
        bioDao.deleteAll();
        labelDAO.deleteAll();
    }

}
