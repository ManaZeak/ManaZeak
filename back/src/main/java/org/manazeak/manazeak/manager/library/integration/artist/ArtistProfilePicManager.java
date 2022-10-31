package org.manazeak.manazeak.manager.library.integration.artist;

import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.daos.library.integration.artist.ArtistIntegrationDAO;
import org.manazeak.manazeak.daos.library.integration.artist.ArtistProfilePicDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistPictureProjection;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.FieldUtil;
import org.manazeak.manazeak.util.HashUtil;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * Allows to manage the picture of the artists.
 */
@Component
public class ArtistProfilePicManager {

    private static final Logger LOG = LoggerFactory.getLogger(ArtistProfilePicManager.class);
    private static final int BUFFER_SIZE = 500;
    private static final ThumbSizeEnum[] THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL,
            ThumbSizeEnum.TINY,
            ThumbSizeEnum.SMALL,
            ThumbSizeEnum.MEDIUM
    };
    private final ArtistProfilePicDAO artistProfilePicDAO;

    private final ArtistIntegrationDAO artistIntegrationDAO;

    public ArtistProfilePicManager(ArtistProfilePicDAO artistProfilePicDAO, ArtistIntegrationDAO artistIntegrationDAO) {
        this.artistProfilePicDAO = artistProfilePicDAO;
        this.artistIntegrationDAO = artistIntegrationDAO;
    }

    /**
     * Generate the thumbnails for a list of artists.
     *
     * @param artists The list containing the name and the id of the artists.
     * @return The list of generated hash for the buffer associated to the artist id.
     */
    private Runnable generateThumbsArtists(List<ArtistPictureProjection> artists) {
        return () -> {


            try {
                List<Pair<Long, String>> results = new ArrayList<>();
                // Generating the thumbnails.
                for (ArtistPictureProjection artist : artists) {
                    Pair<Long, String> artistThumb = generateThumbsArtist(artist);
                    if (artistThumb != null) {
                        results.add(artistThumb);
                    }
                }

                // Saving the results in the database.
                artistIntegrationDAO.updateThumbArtistPicture(results);
            } catch (Exception e) {
                LOG.error("Error during the generation of the artists thumbnails.", e);
            }
        };
    }

    /**
     * Generate the thumbnails of an artist if the artist exists in the database.
     *
     * @param artist The information needed to find the artist picture.
     * @return A pair containing the id of the artist and the name of the thumbnail. If not thumb has been generated, returns null.
     */
    private static Pair<Long, String> generateThumbsArtist(ArtistPictureProjection artist) {
        // Generating the name of the artist on the FS.
        String fsArtistName = FieldUtil.removeForbiddenFsChar(artist.getName());
        // Checking if the file is on the FS.
        Path artistPicturePath = LibraryConstant.ARTIST_PROFILE_PICTURE_PATH
                .resolve(fsArtistName + FileExtensionEnum.JGP.getExtension());
        if (!artistPicturePath.toFile().exists()) {
            return null;
        }

        String thumbName = HashUtil.getMd5Hash(artist.getName());
        // Generating the thumbnails for the artist.
        ThumbnailUtil.generateThumbs(THUMB_SIZE_TO_GENERATE, ResourcePathEnum.ARTIST_PROFILE_PIC_FOLDER.getPath(),
                artistPicturePath, thumbName);

        return Pair.of(artist.getId(), thumbName);
    }

    /**
     * Generate the artist profil pic.
     */
    public void generateArtistProfileThumb() {
        // Creating the thread pool.
        ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.COVER_EXTRACTION_THREAD_NUMBER);

        Long lastArtistId = 0L;
        while (true) {
            Pageable pageable = PageRequest.of(0, BUFFER_SIZE);
            // Getting a packet of artist.
            List<ArtistPictureProjection> artistsThumbsToGenerate = artistProfilePicDAO
                    .getArtistsToGenerateThumbPacket(lastArtistId, pageable);
            if (artistsThumbsToGenerate.isEmpty()) {
                break;
            }
            executor.submit(generateThumbsArtists(artistsThumbsToGenerate));
            // Getting the last id of the artists.
            lastArtistId = artistsThumbsToGenerate.get(artistsThumbsToGenerate.size() - 1).getId();
        }
        // The pool doesn't accept any more jobs.
        executor.shutdown();

        try {
            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                throw new MzkRuntimeException("The time out for the artist profile picture generation was reached, stopping.");
            }
        } catch (InterruptedException e) {
            LOG.error("Thread interrupted during the artist profile integration.", e);
            Thread.currentThread().interrupt();
        }
    }

}
