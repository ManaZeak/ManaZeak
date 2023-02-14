package org.manazeak.manazeak.util.file;

import org.apache.commons.io.FilenameUtils;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.FileMagicNumberEnum;
import org.manazeak.manazeak.exception.MzkFileFormatException;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

/**
 * This class allows to check the format of a file with the magic bytes.
 */
public final class FormatFileCheckerUtil {

    private FormatFileCheckerUtil() {

    }

    /**
     * Check that the given file is a valid image.
     *
     * @param file The file that was sent.
     * @return True if the image is valid. False otherwise.
     */
    public static boolean isValidImage(MultipartFile file) {
        try {
            FileExtensionEnum extension = FileMagicNumberEnum.getFileExtension(file);
            // Checking if the extension is considered has an image.
            return switch (extension) {
                case JGP, PNG -> true;
                default -> false;
            };
        } catch (MzkFileFormatException e) {
            // The format of the file wasn't recognized.
            return false;
        }
    }

    /**
     * Check if a file is an mp3 file.
     *
     * @param file the file that must be verified.
     * @return true if the file is an MP3 file.
     */
    public static boolean isMp3File(Path file) {
        return FilenameUtils.getExtension(file.getFileName().toString())
                .equals(FileExtensionEnum.MP3.getExtensionWithoutDot());
    }
}
