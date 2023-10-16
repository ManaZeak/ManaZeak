package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.artist.ArtistIntegrationDAO;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Generating the artist thumbnails.
 */
@Component
@RequiredArgsConstructor
public class ArtistThumbnailManager extends AbstractThumbnailGenerator{
    private static final ThumbSizeEnum[] THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL,
            ThumbSizeEnum.TINY,
            ThumbSizeEnum.SMALL,
            ThumbSizeEnum.MEDIUM
    };

    private final ArtistDAO artistDAO;
    private final ArtistIntegrationDAO artistIntegrationDAO;

    @Override
    protected List<NameIdentifierProjection> getElementPacket(Long lastId, Pageable pageable) {
        return artistDAO.getArtistsToGenerateThumbPacket(lastId, pageable);
    }

    @Override
    protected ThumbSizeEnum[] getThumbSizeToGenerate() {
        return THUMB_SIZE_TO_GENERATE;
    }

    @Override
    protected ThumbnailTypeEnum getThumbType() {
        return ThumbnailTypeEnum.ARTIST;
    }

    @Override
    protected void saveEntities(List<Pair<Long, String>> results) {
        artistIntegrationDAO.updateThumbArtistPicture(results);
    }
}
