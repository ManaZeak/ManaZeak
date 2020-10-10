package org.manazeak.manazeak.service.file;

import org.manazeak.manazeak.AbstractManaZeakTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * This class is used to get on the FS some images.
 */
@Component
public class TestImageGetter extends AbstractManaZeakTest {

    // JPG FILES
    public static final String JPG_OK = "test_OK.jpg";
    public static final String JPG_KO = "test_KO.jpg";

    // PNG FILES
    public static final String PNG_OK = "test_OK.png";
    public static final String PNG_KO = "test_KO.png";

    private static final String IMAGE_ROOT = "service/file/";

    /**
     * Get the path of an image in the FS.
     *
     * @param image the image filename.
     * @return the path to the image.
     */
    public Path getImagePath(String image) {
        return Paths.get(getApplicationPath(), IMAGE_ROOT, image);
    }

    /**
     * Generate a {@link MockMultipartFile} from a fileName that is present in the filesytem.
     *
     * @param fileName The name of the file to create an multipart object.
     * @return a mock multipart object to test the upload of files.
     * @throws IOException Error during the process.
     */
    public MockMultipartFile getMultipartFile(String fileName) throws IOException {
        return new MockMultipartFile(fileName, Files.newInputStream(getImagePath(fileName)));
    }
}
