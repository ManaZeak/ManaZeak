package org.manazeak.manazeak.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.service.file.TestImageGetter;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Allows to test the generation of thumbnails in the application.
 */
class ThumbnailUtilTest extends AbstractManaZeakTest {

    @Autowired
    TestImageGetter testImageGetter;

    /**
     * Nominal test, valid image.
     */
    @Test
    void testCreationThumb() throws IOException {
        // Getting the image for the FS.
        Path image = testImageGetter.getImagePath(TestImageGetter.THUMB_JPG_FULL_SIZE);
        // Getting the size that must be generated.
        ThumbSizeEnum[] sizes = getGeneratedThumbSize();
        // Trying to resize the image.
        Path tempFolder = getTempAppFolderPath();
        ThumbnailUtil.generateThumbs(sizes, tempFolder, image, TestImageGetter.THUMB_NAME);
        // Checking the image.
        Path thumbnailPath = tempFolder.resolve(ThumbSizeEnum.TINY.getFolderName())
                .resolve(TestImageGetter.THUMB_NAME + ".jpg");
        Assertions.assertTrue(thumbnailPath.toFile().exists(), "The thumbnail hasn't been generated.");
    }

    /**
     * Trying to generate a thumbnail with a missing file.
     */
    @Test
    void testCreationThumbMissingFile() {
        // Thumb folder
        Path applicationPath = Paths.get(getApplicationPath());
        // Getting a non image file.
        Path image = applicationPath.resolve("thumb.jpg");
        // Applying the modification to the file.
        Assertions.assertThrowsExactly(FileNotFoundException.class, () -> ThumbnailUtil.generateThumbs(getGeneratedThumbSize(), applicationPath, image, "thumb.jpg"));
        // Checking the image.
        Assertions.assertFalse(image.toFile().exists());
    }

    /**
     * Get the list of the expected size.
     *
     * @return The list of thumbnails to generate.
     */
    private ThumbSizeEnum[] getGeneratedThumbSize() {
        // Getting the size that must be generated.
        return new ThumbSizeEnum[]{ThumbSizeEnum.TINY};
    }

}
