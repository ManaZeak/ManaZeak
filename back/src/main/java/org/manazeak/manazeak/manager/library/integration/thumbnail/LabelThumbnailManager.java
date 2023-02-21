package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.label.LabelIntegrationDAO;
import org.manazeak.manazeak.daos.track.LabelDAO;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailGenerationProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LabelThumbnailManager extends AbstractThumbnailGenerator {

    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL,
            ThumbSizeEnum.MEDIUM,
            ThumbSizeEnum.SMALL
    };

    private final LabelDAO labelDAO;
    private final LabelIntegrationDAO labelIntegrationDAO;

    @Override
    protected List<ThumbnailGenerationProjection> getElementsPacket(Long lastId, Pageable pageable) {
        return labelDAO.getLabelThumbsGeneration(lastId, pageable);
    }

    @Override
    protected ThumbSizeEnum[] getThumbSizeToGenerate() {
        return LIST_THUMB_SIZE_TO_GENERATE;
    }

    @Override
    protected ThumbnailTypeEnum getThumbType() {
        return ThumbnailTypeEnum.LABEL;
    }

    @Override
    protected void saveEntities(List<Pair<Long, String>> results) {
        labelIntegrationDAO.updateLabelPicture(results);
    }
}
