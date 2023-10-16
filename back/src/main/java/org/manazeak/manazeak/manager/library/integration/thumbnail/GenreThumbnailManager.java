package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.genre.GenrePictureIntegrationDAO;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GenreThumbnailManager extends AbstractThumbnailGenerator {

    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL,
            ThumbSizeEnum.MEDIUM,
            ThumbSizeEnum.SMALL
    };

    private final GenreDAO genreDAO;
    private final GenrePictureIntegrationDAO genrePictureIntegrationDAO;

    @Override
    protected List<NameIdentifierProjection> getElementPacket(Long lastId, Pageable pageable) {
        return genreDAO.getGenresPictureProjection(lastId, pageable);
    }

    @Override
    protected ThumbSizeEnum[] getThumbSizeToGenerate() {
        return LIST_THUMB_SIZE_TO_GENERATE;
    }

    @Override
    protected ThumbnailTypeEnum getThumbType() {
        return ThumbnailTypeEnum.GENRE;
    }

    @Override
    protected void saveEntities(List<Pair<Long, String>> results) {
        genrePictureIntegrationDAO.updateGenrePictures(results);
    }
}
