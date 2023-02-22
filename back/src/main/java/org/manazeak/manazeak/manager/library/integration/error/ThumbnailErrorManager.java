package org.manazeak.manazeak.manager.library.integration.error;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.library.integration.error.ThumbErrorUpsertDAO;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailErrorDto;
import org.springframework.stereotype.Component;

import java.util.List;

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
     * @param thumbErrors The list of errors to save in the database.
     */
    public void saveErrors(List<ThumbnailErrorDto> thumbErrors) {
        thumbErrorUpsertDAO.mergeThumbError(thumbErrors);
    }

}
