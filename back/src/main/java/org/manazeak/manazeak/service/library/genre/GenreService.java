package org.manazeak.manazeak.service.library.genre;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.genre.GenreManager;
import org.manazeak.manazeak.manager.library.random.genre.RandomGenreManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Control the genre of the application.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class GenreService {

    private final GenreDAO genreDAO;

    private final GenreManager genreManager;

    private final RandomGenreManager randomGenreManager;

    /**
     * Get the details of a genre by its id.
     *
     * @param genreId The id of the genre to find into the database.
     * @return The details of the genre with the associated tracks.
     */
    @Cacheable("detail_genre_view")
    public GenreCompleteInfoDto getGenreDetailById(Long genreId) {
        GenreCompleteInfoDto genre = genreDAO.getGenreDetail(genreId)
                .orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("error.genre.not_found"));

        // Setting all the linked objects.
        genreManager.getGenreCompleteInfo(genre);

        return genre;
    }

    /**
     * Get all the genre contained in the database.
     *
     * @return The list of genres contained in the database.
     */
    public List<GenreMinimalInfoDto> getAllGenreMinimal() {
        return genreDAO.getAllMinimalGenre();
    }

    /**
     * Get some random genre in the database.
     *
     * @param nbGenre The number of genre to get.
     * @return The list of genres.
     */
    public List<GenreMinimalInfoDto> getSomeRandomGenreMinimal(int nbGenre) {
        return randomGenreManager.getRandomElements(nbGenre);
    }

}
