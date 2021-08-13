package org.manazeak.manazeak.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.service.file.TestImageGetter;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

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
    public void testCreationThumb() {
        // Getting the image for the FS.
        Path image = testImageGetter.getImagePath(TestImageGetter.THUMB_JPG_FULL_SIZE);
        // Getting the size that must be generated.
        List<ThumbSizeEnum> sizes = getGeneratedThumbSize();
        // Trying to resize the image.
        Path applicationPath = Paths.get(getApplicationPath());
        ThumbnailUtil.generateThumbs(sizes, applicationPath, image);
        // Checking the image.
        Path thumbnailPath = applicationPath.resolve(ThumbSizeEnum.TINY.getFolderName())
                .resolve(TestImageGetter.THUMB_JPG_FULL_SIZE);
        Assertions.assertTrue(thumbnailPath.toFile().exists(), "The thumbnail hasn't been generated.");
    }

    /**
     * Trying to generate a thumbnail with a missing file.
     */
    @Test
    public void testCreationThumbMissingFile() {
        // Thumb folder
        Path applicationPath = Paths.get(getApplicationPath());
        // Getting a non image file.
        Path image = applicationPath.resolve("thumb.jpg");
        // Getting the size that must be generated.
        List<ThumbSizeEnum> sizes = getGeneratedThumbSize();
        // Applying the modification to the file.
        ThumbnailUtil.generateThumbs(sizes, applicationPath, image);
        // Checking the image.
        Assertions.assertFalse(image.toFile().exists());
    }

    /**
     * Test when the original file is invalid.
     */
    @Test
    public void testCreationThumbInvalidFile() {
        // Thumb folder
        Path applicationPath = getApplicationPathPath();
        // Getting a invalid image file
        Path image = testImageGetter.getImagePath(TestImageGetter.JPG_KO);
        // Getting the size that must be generated.
        List<ThumbSizeEnum> sizes = getGeneratedThumbSize();
        // Applying the modification to the file
        ThumbnailUtil.generateThumbs(sizes, applicationPath, image);
        // Checking the image.
        Assertions.assertFalse(image.toFile().exists());
    }

    /**
     * Get the list of the expected size.
     *
     * @return The list of thumbnails to generate.
     */
    private List<ThumbSizeEnum> getGeneratedThumbSize() {
        // Getting the size that must be generated.
        List<ThumbSizeEnum> sizes = new ArrayList<>();
        sizes.add(ThumbSizeEnum.TINY);
        return sizes;
    }

}