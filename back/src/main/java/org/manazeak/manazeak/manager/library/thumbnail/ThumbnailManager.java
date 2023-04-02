package org.manazeak.manazeak.manager.library.thumbnail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.library.ScanStepEnum;
import org.manazeak.manazeak.manager.library.integration.thumbnail.AlbumCoverIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.thumbnail.ArtistThumbnailManager;
import org.manazeak.manazeak.manager.library.integration.thumbnail.GenreThumbnailManager;
import org.manazeak.manazeak.manager.library.integration.thumbnail.LabelThumbnailManager;
import org.manazeak.manazeak.manager.library.status.LibraryScanStatusManager;
import org.springframework.stereotype.Component;

/**
 * Allow to interact with the thumbnails of the application.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class ThumbnailManager {

    private final LibraryScanStatusManager libraryScanStatusManager;
    private final AlbumCoverIntegrationManager albumCoverIntegrationManager;
    private final ArtistThumbnailManager artistThumbnailManager;
    private final GenreThumbnailManager genreThumbnailManager;
    private final LabelThumbnailManager labelThumbnailManager;

    /**
     * Generating all the thumbnails of the application.
     */
    public void launchThumbnailGeneration() {
        // Launching the thumbnail generation for the album.
        log.info("Starting album cover thumbnail generation.");
        albumCoverIntegrationManager.generateThumbnails();
        log.info("Ending album cover thumbnail generation.");

        // Launching the thumbnail generation for the artists pictures
        log.info("Starting artist profile pictures thumbnail generation.");
        artistThumbnailManager.generateThumbnails();
        log.info("Ending artist profile pictures thumbnail generation.");

        // Launching the thumbnail generation for the labels.
        log.info("Starting the label pictures thumbnail generation");
        labelThumbnailManager.generateThumbnails();
        log.info("Ending the label pictures thumbnail generation");


        log.info("Starting the genre pictures thumbnail generation");
        genreThumbnailManager.generateThumbnails();
        log.info("Ending the genre pictures thumbnail generation");
    }

    /**
     * Generating all the thumbnails of the application during the scan.
     */
    public void launchThumbnailGenerationDuringScan() {
        // Launching the thumbnail generation for the album.
        libraryScanStatusManager.setCurrentStep(ScanStepEnum.ALBUM_COVER_EXTRACTION);
        log.info("Starting album cover thumbnail generation.");
        albumCoverIntegrationManager.generateThumbnails();
        log.info("Ending album cover thumbnail generation.");

        // Launching the thumbnail generation for the artists pictures
        libraryScanStatusManager.setCurrentStep(ScanStepEnum.ARTIST_PICTURE_EXTRACTION);
        log.info("Starting artist profile pictures thumbnail generation.");
        artistThumbnailManager.generateThumbnails();
        log.info("Ending artist profile pictures thumbnail generation.");

        // Launching the thumbnail generation for the labels.
        libraryScanStatusManager.setCurrentStep(ScanStepEnum.LABEL_PICTURE_EXTRACTION);
        log.info("Starting the label pictures thumbnail generation");
        labelThumbnailManager.generateThumbnails();
        log.info("Ending the label pictures thumbnail generation");


        libraryScanStatusManager.setCurrentStep(ScanStepEnum.GENRE_PICTURE_EXTRACTION);
        log.info("Starting the genre pictures thumbnail generation");
        genreThumbnailManager.generateThumbnails();
        log.info("Ending the genre pictures thumbnail generation");
    }

}
