package org.manazeak.manazeak.manager.library.random.artist;

import org.manazeak.manazeak.daos.track.RandomReleaseArtistDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.integration.random.RandomMinMaxProjection;
import org.manazeak.manazeak.manager.library.random.AbstractRandomManager;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RandomReleaseArtistManager extends AbstractRandomManager<ArtistMinimalInfoDto> {

    private final RandomReleaseArtistDAO randomReleaseArtistDAO;

    public RandomReleaseArtistManager(RandomReleaseArtistDAO randomReleaseArtistDAO) {
        this.randomReleaseArtistDAO = randomReleaseArtistDAO;
    }

    @Override
    protected RandomMinMaxProjection getMinMaxIndex() {
        return randomReleaseArtistDAO.getRandomReleaseArtistMinMax();
    }

    @Override
    protected List<ArtistMinimalInfoDto> getElementByIndexes(List<Long> indexValues) {
        return randomReleaseArtistDAO.getListMinimalInfoByIndexes(indexValues);
    }


}
