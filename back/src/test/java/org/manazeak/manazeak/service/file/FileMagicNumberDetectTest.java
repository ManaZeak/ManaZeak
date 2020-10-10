package org.manazeak.manazeak.service.file;

import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.exception.MzkFileFormatException;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

class FileMagicNumberDetectTest extends AbstractManaZeakTest {

    @Autowired
    private TestImageGetter imageGetter;

    /**
     * Check that a JPG file is detected with the magic bytes.
     *
     * @throws IOException error during the unit test
     */
    @Test
    void checkOkFormatJpgFile() throws IOException, MzkFileFormatException {
        Path filePath = imageGetter.getImagePath(TestImageGetter.JPG_OK);
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
        Path filePath = imageGetter.getImagePath(TestImageGetter.JPG_KO);
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
        Path filePath = imageGetter.getImagePath(TestImageGetter.PNG_OK);
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
        Path filePath = imageGetter.getImagePath(TestImageGetter.PNG_KO);
        try (InputStream stream = Files.newInputStream(filePath)) {
            FileMagicNumberVerifyHelper.checkFileTypeIsKo(stream, FileExtensionEnum.PNG);
        }
    }
}
