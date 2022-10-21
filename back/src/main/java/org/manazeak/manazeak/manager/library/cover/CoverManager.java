package org.manazeak.manazeak.manager.library.cover;

import org.manazeak.manazeak.constant.file.FilePathEnum;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.daos.library.integration.cover.CoverIntegrationDAO;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumCoverLinkerProjection;
import org.manazeak.manazeak.entity.track.Cover;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Allows to handle the covers of the albums of the library.
 */
@Component
public class CoverManager {

    private static final Logger LOG = LoggerFactory.getLogger(CoverManager.class);
    private static final int BUFFER_SIZE = 100;
    /**
     * The sizes of the thumbs that will be generated.
     */
    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL, ThumbSizeEnum.LARGE, ThumbSizeEnum.MEDIUM, ThumbSizeEnum.SMALL
    };
    private final AlbumDAO albumDAO;
    private final CoverIntegrationDAO coverIntegrationDAO;

    public CoverManager(AlbumDAO albumDAO, CoverIntegrationDAO coverIntegrationDAO) {
        this.albumDAO = albumDAO;
        this.coverIntegrationDAO = coverIntegrationDAO;
    }

    /**
     * Generate the thumbnails from the album cover.
     *
     * @param cover The cover location in the FS.
     * @return The hashed name of the cover.
     */
    private static String generateCoverThumbs(Path cover) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");

            // Getting the name of the thumb for the location md5
            md5.update(cover.getParent().toString().getBytes(StandardCharsets.UTF_8));
            byte[] digest = md5.digest();
            String coverName = DatatypeConverter.printHexBinary(digest).toUpperCase();

            // Generating the thumbnails.
            ThumbnailUtil.generateThumbs(LIST_THUMB_SIZE_TO_GENERATE, FilePathEnum.COVER_FOLDER.getPath(), cover,
                    coverName);

            // Returning the cover name to save it into the database.
            return coverName;
        } catch (NoSuchAlgorithmException e) {
            throw new MzkRuntimeException("The md5 algorithm wasn't found.", e);
        }
    }

    /**
     * Generate the thumb for the given cover path.
     */
    private Runnable generateThumbForCover(Collection<Path> covers) {
        return () -> {
            // Getting the location of the albums from the cover paths.
            List<String> albumPaths = new ArrayList<>();
            for (Path cover : covers) {
                albumPaths.add(cover.getParent().toString());
            }

            // Getting the albums from the locations.
            Map<String, Long> albumIdByLocation = new HashMap<>();
            List<AlbumCoverLinkerProjection> albums = albumDAO.getAlbumByLocations(albumPaths);
            for (AlbumCoverLinkerProjection album : albums) {
                albumIdByLocation.put(album.getAlbumLocation(), album.getAlbumId());
            }

            List<Cover> newCovers = new ArrayList<>();
            List<Pair<Long, Long>> albumCovers = new ArrayList<>();
            // Modifying the buffer size to avoid taking all the space.
            PkIdProvider.singleton().setPoolSize(Cover.class, BUFFER_SIZE);
            // Iterating through the covers generating the covers and linking the covers with the ids.
            for (Path cover : covers) {
                String coverName = generateCoverThumbs(cover);
                // Creating the cover for the database.
                Cover dbCover = new Cover();
                dbCover.setCoverId(PkIdProvider.singleton().getNewPkId(Cover.class));
                dbCover.setFilename(coverName);
                newCovers.add(dbCover);
                albumCovers.add(Pair.of(dbCover.getCoverId(), albumIdByLocation.get(cover.getParent().toString())));
            }

            // Saving the covers into the database.
            coverIntegrationDAO.insertCovers(newCovers);
            // Setting the covers on the album file.
            coverIntegrationDAO.updateAlbumCovers(albumCovers);
        };
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
            executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            LOG.error("The album cover thumbnail generation was interrupted", e);
            Thread.currentThread().interrupt();
        }
    }
}
