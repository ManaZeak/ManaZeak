package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.cover.CoverIntegrationDAO;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailGenerationProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class AlbumCoverIntegrationManager extends AbstractThumbnailGenerator{

    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL,
            ThumbSizeEnum.LARGE,
            ThumbSizeEnum.MEDIUM,
            ThumbSizeEnum.SMALL
    };
    private final AlbumDAO albumDAO;
    private final CoverIntegrationDAO coverIntegrationDAO;

    @Override
    protected List<ThumbnailGenerationProjection> getElementsPacket(Long lastId, Pageable pageable) {
        return albumDAO.getAlbumThumbsGenerations(lastId, pageable);
    }

    @Override
    protected ThumbSizeEnum[] getThumbSizeToGenerate() {
        return LIST_THUMB_SIZE_TO_GENERATE;
    }

    @Override
    protected ThumbnailTypeEnum getThumbType() {
        return ThumbnailTypeEnum.ALBUM;
    }

    @Override
    protected void saveEntities(List<Pair<Long, String>> results) {
        coverIntegrationDAO.insertCovers(results);
    }
}
