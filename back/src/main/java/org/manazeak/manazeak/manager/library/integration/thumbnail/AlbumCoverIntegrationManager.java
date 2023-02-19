package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailErrorTypeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.cover.CoverIntegrationDAO;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumCoverLinkerProjection;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.integration.error.ThumbnailErrorManager;
import org.manazeak.manazeak.util.HashUtil;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Allows to handle the covers of the albums of the library.
 */
@Component
@RequiredArgsConstructor
public class AlbumCoverIntegrationManager {

    private static final Logger LOG = LoggerFactory.getLogger(AlbumCoverIntegrationManager.class);
    private static final int BUFFER_SIZE = 100;
    /**
     * The sizes of the thumbs that will be generated.
     */
    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL, ThumbSizeEnum.LARGE, ThumbSizeEnum.MEDIUM, ThumbSizeEnum.SMALL
    };
    private final AlbumDAO albumDAO;
    private final CoverIntegrationDAO coverIntegrationDAO;
    private final ThumbnailErrorManager thumbnailErrorManager;

    /**
     * Generate the thumbnails from the album cover.
     *
     * @param cover The cover location in the FS.
     * @return The hashed name of the cover.
     */
    public static String generateCoverThumbs(Path cover) throws IOException {
        String coverName = HashUtil.getMd5Hash(cover.toString()).toUpperCase();

        // Generating the thumbnails.
        ThumbnailUtil.generateThumbs(LIST_THUMB_SIZE_TO_GENERATE, ThumbnailTypeEnum.ALBUM.getBaseDestFolder(), cover, coverName);

        // Returning the cover name to save it into the database.
        return coverName;
    }

    public void generateCoverThumbs(String path, Long albumId) {
        try {
            generateCoverThumbs(Paths.get(path));
        } catch (Exception e) {
            thumbnailErrorManager.addErrorForEntity(ThumbnailTypeEnum.ALBUM, e.getMessage(), albumId, ThumbnailErrorTypeEnum.IMAGE_ERROR);
        }
    }

    /**
     * Launch the process that generate the thumbnail of the covers.
     *
     * @param coverPaths The list of the cover path.
     */
    public void launchCoverThumbnailGeneration(Set<Path> coverPaths) {
        // Creating the thread pool.
        ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.COVER_EXTRACTION_THREAD_NUMBER);
        int startIndex = 0;
        List<Path> listCoverPath = new ArrayList<>(coverPaths);
        // Launching the thread with a cover path.
        for (int endIndex = BUFFER_SIZE; endIndex <= listCoverPath.size(); endIndex += BUFFER_SIZE) {
            executor.submit(generateThumbForCover(listCoverPath.subList(startIndex, endIndex)));
            startIndex = endIndex;
        }

        if (startIndex < listCoverPath.size()) {
            executor.submit(generateThumbForCover(listCoverPath.subList(startIndex, listCoverPath.size())));
        }

        // The pool doesn't accept any more jobs.
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

    /**
     * Generate the thumb for the given cover path.
     */
    private Runnable generateThumbForCover(Collection<Path> coverPaths) {
        return () -> {
            try {
                // Getting the location of the albums from the cover paths.
                List<String> albumPaths = new ArrayList<>();
                for (Path cover : coverPaths) {
                    albumPaths.add(cover.getParent().toString());
                }

                // Getting the albums from the locations.
                List<AlbumCoverLinkerProjection> albums = albumDAO.getAlbumByLocations(albumPaths);

                // Creating a map of the album by location.
                Map<String, Long> albumIdByLocation = new HashMap<>();
                for (AlbumCoverLinkerProjection album : albums) {
                    if (album.getAlbumId() == null) {
                        LOG.error("The album with the path {} doesn't exists in the database.", album.getAlbumLocation());
                    }
                    albumIdByLocation.put(album.getAlbumLocation(), album.getAlbumId());
                }

                // Associating the covers with the albums in the database.
                List<Pair<Long, String>> albumCovers = new ArrayList<>();
                for (Path cover : coverPaths) {
                    Long albumId = albumIdByLocation.get(cover.getParent().toString());
                    if (albumId == null) {
                        LOG.error("The album of path '{}' doesn't have any id in the database.", cover.getParent());
                        throw new MzkRuntimeException("The album id is null, an error has been encountered during the scan.");
                    }
                    generateThumbs(cover, albumId, albumCovers);
                }

                // Saving the covers into the database.
                coverIntegrationDAO.insertCovers(albumCovers);
            } catch (Exception e) {
                LOG.error("Error during the cover insertion in the database.", e);
            }
        };
    }

    private void generateThumbs(Path cover, Long albumId, List<Pair<Long, String>> albumCovers) {
        try {
            // Generating the thumbnails of the cover.
            String coverName = generateCoverThumbs(cover);
            // Adding to the element to update.
            albumCovers.add(Pair.of(albumId, coverName));
        } catch (Exception e) {
            thumbnailErrorManager.addErrorForEntity(ThumbnailTypeEnum.ALBUM, e.getMessage(), albumId, ThumbnailErrorTypeEnum.IMAGE_ERROR);
        }
    }
}
