package org.manazeak.manazeak.service.library.genre;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreDetailDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.genre.GenreManager;
import org.manazeak.manazeak.manager.library.random.genre.RandomGenreManager;
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
    public GenreDetailDto getGenreDetailById(Long genreId) {
        GenreDetailDto genre = genreDAO.getGenreDetail(genreId)
                .orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("error.genre.not_found"));

        // Getting the tracks by the genre id.
        genre.addArtists(genreManager.getArtistsInfoByGenreId(genreId));

        return genre;
    }

    public List<GenreMinimalInfoDto> getAllRandomGenreMinimal() {
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
