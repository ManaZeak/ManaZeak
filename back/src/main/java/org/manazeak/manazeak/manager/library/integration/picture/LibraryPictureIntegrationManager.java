package org.manazeak.manazeak.manager.library.integration.picture;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.ScanStepEnum;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistProfilePicManager;
import org.manazeak.manazeak.manager.library.integration.genre.GenreThumbManager;
import org.manazeak.manazeak.manager.library.integration.label.LabelPictureThumbManager;
import org.manazeak.manazeak.manager.library.status.LibraryScanStatusManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Process the pictures processed during the library scan.
 */
@Component
@RequiredArgsConstructor
public class LibraryPictureIntegrationManager {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryPictureIntegrationManager.class);
    private final LibraryScanStatusManager libraryScanStatusManager;
    private final ArtistProfilePicManager artistProfilePicManager;
    private final LabelPictureThumbManager labelThumbManager;
    private final GenreThumbManager genreThumbManager;

    public void integrateLibraryPictures() {
        LOG.info("Starting the artist profile pictures thumbnail generation");
        // Generating the artists thumbnails.
        libraryScanStatusManager.setCurrentStep(ScanStepEnum.ARTIST_PICTURE_EXTRACTION);
        artistProfilePicManager.generateArtistProfileThumb();
        LOG.info("Ending artist profile picture thumbnail generation.");

        libraryScanStatusManager.setCurrentStep(ScanStepEnum.LABEL_PICTURE_EXTRACTION);
        LOG.info("Starting the label pictures thumbnail generation");
        labelThumbManager.generateLabelThumbs();
        LOG.info("Ending the label pictures thumbnail generation");

        libraryScanStatusManager.setCurrentStep(ScanStepEnum.GENRE_PICTURE_EXTRACTION);
        LOG.info("Starting the genre pictures thumbnail generation");
        genreThumbManager.generateGenreThumbs();
        libraryScanStatusManager.setCurrentStep(ScanStepEnum.GENRE_PICTURE_EXTRACTION);
        LOG.info("Ending the genre pictures thumbnail generation");

    }

}
