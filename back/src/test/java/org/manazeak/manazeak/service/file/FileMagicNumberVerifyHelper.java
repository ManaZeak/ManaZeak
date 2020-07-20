package org.manazeak.manazeak.service.file;

import org.junit.jupiter.api.Assertions;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.FileMagicNumberEnum;
import org.manazeak.manazeak.exception.MzkFileFormatException;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.io.InputStream;

/**
 * This class allows to test the detection of the type of file.
 */
public class FileMagicNumberVerifyHelper {

    private FileMagicNumberVerifyHelper() {

    }

    /**
     * Check that the file is recognized.
     *
     * @param stream            The stream containing the image to test.
     * @param expectedExtension The expected extension of the file.
     * @throws IOException error during the process.
     */
    public static void checkFileTypeIsOk(InputStream stream, FileExtensionEnum expectedExtension) throws IOException,
            MzkFileFormatException {
        FileExtensionEnum type = getFileType(stream);
        Assertions.assertEquals(expectedExtension, type, "The file type doesn't match");
    }

    /**
     * Check that the file isn't recognized or the format is not the same that the one is asked.
     *
     * @param stream            The stream containing the image to test.
     * @param expectedExtension The expected extension of the file.
     * @throws IOException Error during the process with the FS.
     */
    public static void checkFileTypeIsKo(InputStream stream, FileExtensionEnum expectedExtension) throws IOException {
        try {
            FileExtensionEnum type = getFileType(stream);
            Assertions.assertNotEquals(expectedExtension, type, "The file type matches, it shouldn't.");
        } catch (MzkFileFormatException e) {
            // If the file type hasn't been found then it's ok.
        }
    }

    private static FileExtensionEnum getFileType(InputStream stream) throws IOException, MzkFileFormatException {
        MockMultipartFile file = new MockMultipartFile("test", stream);
        return FileMagicNumberEnum.getFileExtension(file);
    }
}
