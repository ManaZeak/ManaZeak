package org.manazeak.manazeak.service.library.genre;

import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailDto;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.track.TrackManager;
import org.springframework.stereotype.Service;

/**
 * Control the genre of the application.
 */
@TransactionalWithRollback
@Service
public class GenreService {

    private final GenreDAO genreDAO;

    private final TrackManager trackManager;

    public GenreService(GenreDAO genreDAO, TrackManager trackManager) {
        this.genreDAO = genreDAO;
        this.trackManager = trackManager;
    }

    /**
     * Get the details of a genre by its id.
     *
     * @param genreId The id of the genre to find into the database.
     * @return The details of the genre with the associated tracks.
     */
    public GenreDetailDto getGenreDetailById(Long genreId) {
        GenreDetailDto genre = genreDAO.getGenreDetail(genreId)
                .orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("error.genre.not_found"));

        // Getting the tracks by the genre id.
        genre.setTracks(trackManager.getTrackInfoByGenreId(genreId));

        return genre;
    }

}
