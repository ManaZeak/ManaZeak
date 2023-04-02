package org.manazeak.manazeak.service.library.thumb;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.daos.library.management.thumbnail.ThumbnailErrorSearchDAO;
import org.manazeak.manazeak.daos.management.ThumbnailErrorDAO;
import org.manazeak.manazeak.entity.dto.admin.thumbnail.ThumbnailErrorCriteriaDto;
import org.manazeak.manazeak.entity.dto.admin.thumbnail.ThumbnailErrorLineDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.thumbnail.ThumbnailManager;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * Service used to generate the thumbnails.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class ThumbnailService {

    private final ThumbnailManager thumbnailManager;
    private final ThumbnailErrorSearchDAO thumbnailErrorSearchDAO;
    private final ThumbnailErrorDAO thumbnailErrorDAO;

    /**
     * Delete all the thumbnails of the application and generate new ones.
     */
    @Async
    public void regenerateThumbs() {
        // TODO: add a state in the database to avoid launching 2 cover rescan.
        try {
            // Deleting all the thumbnails.
            for (ResourcePathEnum resourcePath : ResourcePathEnum.values()) {
                FileUtils.deleteDirectory(resourcePath.getPath().toFile());
            }
        } catch (IOException e) {
            throw new MzkRuntimeException("Error deleting the thumbnails of the application.", e);
        }
        // Regenerating the thumbnails.
        thumbnailManager.launchThumbnailGeneration();
    }

    /**
     * Get a list of thumbnails from a list of criterias.
     *
     * @param criteria   The filter information.
     * @return The list of elements matching the criteria.
     */
    public List<ThumbnailErrorLineDto> getThumbnailErrorByCriteria(ThumbnailErrorCriteriaDto criteria) {
        return thumbnailErrorSearchDAO.getThumbnailsFromCriteria(criteria);
    }

    /**
     * Get the number of elements matching the criteria in the thumbnail error table.
     *
     * @param criteriaDto The information about the criteria of the user.
     * @return The number of thumbnail matching the user criteria.
     */
    public Long getThumbnailErrorNumbersByCriteria(ThumbnailErrorCriteriaDto criteriaDto) {
        return thumbnailErrorSearchDAO.getNumberThumbError(criteriaDto);
    }

    /**
     * Change a thumbnail error status to the processed state.
     *
     * @param thumbErrorId The id of the thumbnail to set.
     */
    public void setThumbErrorToProcessed(@NonNull Long thumbErrorId) {
        thumbnailErrorDAO.updateThumbnailErrorStatusById(thumbErrorId);
    }
}
