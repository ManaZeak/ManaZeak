package org.manazeak.manazeak.manager.library.random.artist;

import org.manazeak.manazeak.daos.track.RandomReleaseArtistDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.random.RandomMinMaxProjection;
import org.manazeak.manazeak.manager.library.random.AbstractRandomManager;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

/**
 * Allows to get from the database random release artists.
 */
@Component
public class RandomReleaseArtistManager extends AbstractRandomManager<ArtistMinimalInfoDto> {

    private final RandomReleaseArtistDAO randomReleaseArtistDAO;

    public RandomReleaseArtistManager(RandomReleaseArtistDAO randomReleaseArtistDAO) {
        this.randomReleaseArtistDAO = randomReleaseArtistDAO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected RandomMinMaxProjection getMinMaxIndex() {
        return randomReleaseArtistDAO.getRandomReleaseArtistMinMax();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected List<ArtistMinimalInfoDto> getElementByIndexes(Set<Long> indexValues) {
        return randomReleaseArtistDAO.getListMinimalInfoByIndexes(indexValues);
    }


}
