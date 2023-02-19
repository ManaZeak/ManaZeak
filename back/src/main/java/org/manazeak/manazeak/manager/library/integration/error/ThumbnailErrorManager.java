package org.manazeak.manazeak.manager.library.integration.error;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailErrorTypeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.error.ThumbErrorUpsertDAO;
import org.springframework.stereotype.Component;

/**
 * Allows to handle the errors during the thumbnails' generation.
 */
@Component
@RequiredArgsConstructor
public class ThumbnailErrorManager {

    private final ThumbErrorUpsertDAO thumbErrorUpsertDAO;

    /**
     * Creating or updating an error in the database.
     *
     * @param type     The type of the entity the thumbnail failed.
     * @param error    The error message.
     * @param entityId The id of the element associated to this thumb.
     */
    public void addErrorForEntity(@NonNull ThumbnailTypeEnum type, @NonNull String error, @NonNull Long entityId, @NonNull ThumbnailErrorTypeEnum errorType) {
        thumbErrorUpsertDAO.mergeThumbError(error, entityId, type, errorType);
    }

}
