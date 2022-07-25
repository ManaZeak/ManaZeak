package org.manazeak.manazeak.manager.library.integration.artist;

import org.apache.commons.io.FilenameUtils;
import org.manazeak.manazeak.constant.file.FilePathEnum;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Stream;

/**
 * Allows to manage the picture of the artists.
 */
@Component
public class ArtistProfilePicManager {

    private static final Logger LOG = LoggerFactory.getLogger(ArtistProfilePicManager.class);

    private static final ThumbSizeEnum[] THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL,
            ThumbSizeEnum.TINY,
            ThumbSizeEnum.SMALL,
            ThumbSizeEnum.MEDIUM
    };

    private static void generateThumbsArtist(Path path) {
        try {
            if (path != null && !Files.isDirectory(path)) {
                ThumbnailUtil.generateThumbs(THUMB_SIZE_TO_GENERATE, FilePathEnum.ARTIST_PROFILE_PIC_FOLDER.getPath(),
                        path, FilenameUtils.removeExtension(path.getFileName().toString()));
            }
        } catch (Exception e) {
            LOG.error("Error during the generation of the artist thumbnail {}", path.getFileName(), e);
        }
    }

    /**
     * Generate the artist profil pic.
     */
    public ExecutorService generateArtistProfileThumb() {
        // Creating the thread pool.
        ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.COVER_EXTRACTION_THREAD_NUMBER);

        // Iterating in the folder containing the profile pictures.
        try (Stream<Path> paths = Files.walk(LibraryConstant.ARTIST_PROFILE_PICTURE_PATH)) {
            paths.forEach((Path p) -> executor.submit(() -> generateThumbsArtist(p)));
        } catch (IOException e) {
            throw new MzkRuntimeException("Error during the artist thumbnail generation", e);
        }

        // The pool doesn't accept any more jobs.
        executor.shutdown();

        return executor;
    }

}
