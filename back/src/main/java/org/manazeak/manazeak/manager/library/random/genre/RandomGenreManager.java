package org.manazeak.manazeak.manager.library.random.genre;

import org.manazeak.manazeak.daos.random.RandomGenreDAO;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.random.RandomMinMaxProjection;
import org.manazeak.manazeak.manager.library.random.AbstractRandomManager;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

/**
 * Allows to get random genres in the database.
 */
@Component
public class RandomGenreManager extends AbstractRandomManager<GenreMinimalInfoDto> {

    private final RandomGenreDAO randomGenreDAO;

    public RandomGenreManager(RandomGenreDAO randomGenreDAO) {
        this.randomGenreDAO = randomGenreDAO;
    }

    @Override
    protected RandomMinMaxProjection getMinMaxIndex() {
        return randomGenreDAO.getRandomReleaseGenreMinMax();
    }

    @Override
    protected List<GenreMinimalInfoDto> getElementByIndexes(Set<Long> indexValues) {
        return randomGenreDAO.getListMinimalInfoByIndexes(indexValues);
    }
}
