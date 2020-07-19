package org.manazeak.manazeak.util.file;

import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.FileMagicNumberEnum;
import org.manazeak.manazeak.exception.MzkFileFormatException;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


/**
 * Util class for file handling.
 */
public final class FileUtil {

    private static final Logger LOG = LoggerFactory.getLogger(FileUtil.class);

    private FileUtil () {

    }

    /**
     * Get the extension of a file from it's magic bytes.
     * @param file The file in the form.
     */
    public static FileExtensionEnum getExtensionByMagicBytes(MultipartFile file) {
        try {
            return FileMagicNumberEnum.getFileExtension(file);
        } catch (MzkFileFormatException e) {
            LOG.error("Wrong format detected after the validation of an uploaded file");
            throw new MzkRuntimeException("Bad format detected", e);
        }
    }

    /**
     * Create the parent and the current directory if it doesn't exist.
     * @param path The path of the directory to create.
     */
    public static void createDirectories(Path path) {
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                throw new MzkRuntimeException("Couldn't create the parent directories.");
            }
        }
    }
}
