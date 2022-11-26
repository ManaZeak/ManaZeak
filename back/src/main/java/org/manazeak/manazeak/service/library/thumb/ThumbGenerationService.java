package org.manazeak.manazeak.service.library.thumb;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.integration.picture.LibraryPictureIntegrationManager;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Service used to generate the thumbnails.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class ThumbGenerationService {

    private final LibraryPictureIntegrationManager libraryPictureIntegrationManager;

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
            // Regenerating the thumbnails.
            libraryPictureIntegrationManager.integrateLibraryPictures();
            // Regenerating the thumbnails for the tracks.
            libraryPictureIntegrationManager.launchThumbGenerationAlbumCovers();
        } catch (IOException e) {
            throw new MzkRuntimeException("Error deleting the thumbnails of the application.", e);
        }
    }

}
