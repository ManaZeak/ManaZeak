package org.manazeak.manazeak.util.file;

import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.FileMagicNumberEnum;
import org.manazeak.manazeak.exception.MzkFileFormatException;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;


/**
 * Util class for file handling.
 */
public final class FileUtil {

    private static final Logger LOG = LoggerFactory.getLogger(FileUtil.class);

    private FileUtil() {

    }

    /**
     * Get the extension of a file from it's magic bytes.
     *
     * @param file The file in the form.
     */
    public static FileExtensionEnum getExtensionByMagicBytes(MultipartFile file) {
        try {
            return FileMagicNumberEnum.getFileExtension(file);
        } catch (MzkFileFormatException e) {
            LOG.error("Wrong format detected after the validation of an uploaded file");
            throw new MzkRuntimeException("general.error.file.bad_format", "general.error.file.bad_format_title", e);
        }
    }

    /**
     * Create the parent and the current directory if it doesn't exist.
     *
     * @param path The path of the directory to create.
     */
    public static void createDirectories(Path path) {
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                throw new MzkRuntimeException("general.error.file.parent_directory",
                        "general.error.file.parent_directory_title", e);
            }
        }
    }

    /**
     * Creates a file containing the given bytes.
     *
     * @param path  The path of the file that will be created.
     * @param bytes The bytes that will be written into the file.
     */
    public static void writeBytesToFile(Path path, byte[] bytes) {
        // Creating the directories needed for the file.
        createDirectories(path);
        // Creating the file and writing the data.
        try (OutputStream fos = Files.newOutputStream(path)) {
            fos.write(bytes);
        } catch (IOException e) {
            throw new MzkRuntimeException("general.error.file.writing_error", "general.error", e);
        }
    }
}
