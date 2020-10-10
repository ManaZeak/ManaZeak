package org.manazeak.manazeak.util.file;

import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.FileMagicNumberEnum;
import org.manazeak.manazeak.exception.MzkFileFormatException;
import org.springframework.web.multipart.MultipartFile;

/**
 * This class allows to check the format of a file with the magic bytes.
 */
public final class FormatFileCheckerUtil {

    private FormatFileCheckerUtil() {

    }

    /**
     * Check that the given file is a valid image.
     *
     * @return True if the image is valid. False otherwise.
     */
    public static boolean isValidImage(MultipartFile file) {
        try {
            FileExtensionEnum extension = FileMagicNumberEnum.getFileExtension(file);
            // Checking if the extension is considered has an image.
            switch (extension) {
                case JGP:
                case PNG:
                    return true;
                default:
                    return false;
            }
        } catch (MzkFileFormatException e) {
            // The format of the file wasn't recognized.
            return false;
        }
    }
}
