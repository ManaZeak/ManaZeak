package org.manazeak.manazeak.service.file;

import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.exception.MzkFileFormatException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

class FileMagicNumberDetectTest extends AbstractManaZeakTest {

    private static final String IMAGE_ROOT = "service/file/";

    // JPG FILES
    private static final String JPG_OK = "test_OK.jpg";
    private static final String JPG_KO = "test_KO.jpg";

    // PNG FILES
    private static final String PNG_OK = "test_OK.png";
    private static final String PNG_KO = "test_KO.png";

    /**
     * Check that a JPG file is detected with the magic bytes.
     *
     * @throws IOException error during the unit test
     */
    @Test
    void checkOkFormatJpgFile() throws IOException, MzkFileFormatException {
        Path filePath = getImagePath(JPG_OK);
        try (InputStream stream = Files.newInputStream(filePath)) {
            FileMagicNumberVerifyHelper.checkFileTypeIsOk(stream, FileExtensionEnum.JGP);
        }
    }

    /**
     * Check that a non JPG file isn't detected as JPG.
     *
     * @throws IOException error during the unit test
     */
    @Test
    void checkKoFormatJpgFile() throws IOException {
        Path filePath = getImagePath(JPG_KO);
        try (InputStream stream = Files.newInputStream(filePath)) {
            FileMagicNumberVerifyHelper.checkFileTypeIsKo(stream, FileExtensionEnum.JGP);
        }
    }

    /**
     * Check that a PNG file is detected with the magic bytes.
     *
     * @throws IOException error during the unit test
     */
    @Test
    void checkOkFormatPngFile() throws IOException, MzkFileFormatException {
        Path filePath = getImagePath(PNG_OK);
        try (InputStream stream = Files.newInputStream(filePath)) {
            FileMagicNumberVerifyHelper.checkFileTypeIsOk(stream, FileExtensionEnum.PNG);
        }
    }

    /**
     * Check that a non PNG file isn't detected as PNG.
     *
     * @throws IOException error during the unit test
     */
    @Test
    void checkKoFormatPngFile() throws IOException {
        Path filePath = getImagePath(PNG_KO);
        try (InputStream stream = Files.newInputStream(filePath)) {
            FileMagicNumberVerifyHelper.checkFileTypeIsKo(stream, FileExtensionEnum.PNG);
        }
    }

    /**
     * Get the path of an image in the FS.
     *
     * @param image the image filename.
     * @return the path to the image.
     */
    private Path getImagePath(String image) {
        return Paths.get(getApplicationPath(), IMAGE_ROOT, image);
    }
}
