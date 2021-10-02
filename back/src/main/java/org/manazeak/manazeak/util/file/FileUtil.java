package org.manazeak.manazeak.util.file;

import org.apache.commons.io.FilenameUtils;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.FileMagicNumberEnum;
import org.manazeak.manazeak.constant.notification.file.FileNotificationEnum;
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
     * Get the extension of a file from its magic bytes.
     *
     * @param file The file in the form.
     * @return The extension of the file.
     */
    public static FileExtensionEnum getExtensionByMagicBytes(MultipartFile file) {
        try {
            return FileMagicNumberEnum.getFileExtension(file);
        } catch (MzkFileFormatException e) {
            LOG.error("Wrong format detected after the validation of an uploaded file");
            throw new MzkRuntimeException("Wrong format detected.", FileNotificationEnum.BAD_FORMAT_ERROR, e);
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
                throw new MzkRuntimeException("Error encountered when creating the parent directory",
                        FileNotificationEnum.PARENT_DIRECTORY_CREATION_ERROR, e);
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
            throw new MzkRuntimeException("Error writing file.", FileNotificationEnum.IO_ERROR, e);
        }
    }

    /**
     * Check if the file is an audio file.
     *
     * @param filePath The location of the file to evaluate.
     * @return True if the file is a flac or a mp3.
     */
    public static boolean isAudioFileByExtension(Path filePath) {
        if (filePath == null) {
            return false;
        }
        // Getting the extension of the file
        String extension = FilenameUtils.getExtension(filePath.getFileName().toString());
        return (extension.equals(FileExtensionEnum.FLAC.getExtensionWithoutDot())
                || extension.equals(FileExtensionEnum.MP3.getExtensionWithoutDot()));
    }

    /**
     * Check if the file is a cover file.
     *
     * @param filePath The location of the file to test.
     * @return True if the file is a .jpg.
     */
    public static boolean isCoverFileByExtension(Path filePath) {
        String extension = FilenameUtils.getExtension(filePath.getFileName().toString());
        return extension.equals(FileExtensionEnum.JGP.getExtensionWithoutDot());
    }
}
