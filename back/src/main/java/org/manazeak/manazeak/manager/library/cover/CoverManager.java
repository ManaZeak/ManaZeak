package org.manazeak.manazeak.manager.library.cover;

import org.manazeak.manazeak.constant.file.FilePathEnum;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Allows to handle the covers of the albums of the library.
 */
@Component
public class CoverManager {

    /**
     * The sizes of the thumbs that will be generated.
     */
    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL, ThumbSizeEnum.LARGE, ThumbSizeEnum.MEDIUM, ThumbSizeEnum.SMALL
    };

    /**
     * Launch the process that generate the thumbnail of the covers.
     *
     * @param coverPaths The list of the cover path.
     */
    public void launchCoverThumbnailGeneration(Collection<Path> coverPaths) {
        // Creating the thread pool.
        ExecutorService executor = Executors.newFixedThreadPool(LibraryConstant.COVER_EXTRACTION_THREAD_NUMBER);
        // Launching the thread with a cover path.
        for (Path coverPath : coverPaths) {
            executor.submit(() -> generateThumbForCover(coverPath));
        }

        // The pool doesn't accept any more jobs.
        executor.shutdown();
    }

    /**
     * Generate the thumb for the given cover path.
     */
    private static void generateThumbForCover(Path cover) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            // Getting the name of the thumb for the location md5
            md5.update(cover.getParent().toString().getBytes(StandardCharsets.UTF_8));
            byte[] digest = md5.digest();
            String coverName = DatatypeConverter.printHexBinary(digest).toUpperCase();
            // Generating the thumbnails.
            ThumbnailUtil.generateThumbs(LIST_THUMB_SIZE_TO_GENERATE, FilePathEnum.COVER_FOLDER.getPath(), cover,
                    coverName);
        } catch (NoSuchAlgorithmException e) {
            throw new MzkRuntimeException("The md5 algorithm wasn't found.", e);
        }
    }
}
