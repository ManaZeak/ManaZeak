package org.manazeak.manazeak.manager.library.integration.picture;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.constant.library.ScanStepEnum;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumCoverUpdateProjection;
import org.manazeak.manazeak.manager.library.cover.CoverManager;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistProfilePicManager;
import org.manazeak.manazeak.manager.library.integration.genre.GenreThumbManager;
import org.manazeak.manazeak.manager.library.integration.label.LabelPictureThumbManager;
import org.manazeak.manazeak.manager.library.status.LibraryScanStatusManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Process the pictures processed during the library scan.
 */
@Component
@RequiredArgsConstructor
public class LibraryPictureIntegrationManager {

    private static final int BUFFER_SIZE = 100;
    private static final Logger LOG = LoggerFactory.getLogger(LibraryPictureIntegrationManager.class);
    private final LibraryScanStatusManager libraryScanStatusManager;
    private final ArtistProfilePicManager artistProfilePicManager;
    private final LabelPictureThumbManager labelThumbManager;
    private final GenreThumbManager genreThumbManager;

    private final CoverManager coverManager;

    private final AlbumDAO albumDAO;

    /**
     * Launch the generation of the thumbnails of the objects in the database.
     */
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

    /**
     * Launch the generation of the thumbnails of the albums of the application.
     */
    public void launchThumbGenerationAlbumCovers() {
        Long lastAlbumId = 0L;
        Pageable page = PageRequest.of(0, BUFFER_SIZE);
        ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.COVER_EXTRACTION_THREAD_NUMBER);

        // Getting album paquets, until all the album are processed.
        while (true) {
            // Getting the list of albums in the database.
            List<AlbumCoverUpdateProjection> albums = albumDAO.getAlbumsLocationAndCoverName(lastAlbumId, page);
            if (albums.isEmpty()) {
                break;
            }
            // Adding the tasks in the executor.
            albums.forEach(album -> executor.submit(() -> CoverManager.generateCoverThumbs(album.getAlbumLocation())));
        }

        executor.shutdown();

        try {
            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                LOG.error("The executor of the album cover thumbnails generation timed out");
            }
        } catch (InterruptedException e) {
            LOG.error("The album cover thumbnail generation was interrupted", e);
            Thread.currentThread().interrupt();
        }
    }

}
