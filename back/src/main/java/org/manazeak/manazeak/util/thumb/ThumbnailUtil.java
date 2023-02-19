package org.manazeak.manazeak.util.thumb;

import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.FileUtils;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.FieldUtil;
import org.manazeak.manazeak.util.HashUtil;
import org.manazeak.manazeak.util.file.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Path;

/**
 * Generate thumbnails for images.
 */
public final class ThumbnailUtil {

    private static final Logger LOG = LoggerFactory.getLogger(ThumbnailUtil.class);

    private ThumbnailUtil() {

    }

    /**
     * Generate the thumbnails for the given image
     *
     * @param thumbsToGenerate The list of the size of the thumbnails that needs to be generated.
     * @param thumbFolder      The folder that will contain the thumbnail.
     * @param image            The image that will be transformed.
     * @param thumbName        The name of the generated thumbnail.
     */
    public static void generateThumbs(ThumbSizeEnum[] thumbsToGenerate, Path thumbFolder, Path image,
                                      String thumbName) throws IOException {
        // Testing if the image exists.
        if (!image.toFile().exists()) {
            LOG.warn("The image : {} cannot be found, the thumbnails haven't been created.", image);
        }
        // Generating the thumbnails for the given list of sizes.
        for (ThumbSizeEnum thumbSize : thumbsToGenerate) {
            // When the original mode is set, only copy the file into the orig folder.
            if (thumbSize == ThumbSizeEnum.ORIGINAL) {
                FileUtils.copyFile(image.toFile(), getDestinationPath(thumbSize, thumbFolder, thumbName).toFile());
            } else {
                generateThumb(thumbSize, image, thumbFolder, thumbName);
            }
        }

    }

    /**
     * Generate the thumbnails for the given size, type and filename.
     *
     * @param sizes     The sizes expected for the thumbnails.
     * @param fileName  The name of the file to process.
     * @param thumbType The type of the thumbnail processing.
     * @return The name of the file generated. Return null if the file is not found.
     */
    public static String generateThumbnail(ThumbSizeEnum[] sizes, String fileName, ThumbnailTypeEnum thumbType) throws IOException {
        if (thumbType == ThumbnailTypeEnum.ALBUM) {
            throw new MzkRuntimeException("This method doesn't support the album type");
        }
        Path sourcePicturePath = thumbType.getBaseSourceFolder()
                .resolve(FieldUtil.removeForbiddenFsChar(fileName) + FileExtensionEnum.JGP.getExtension());
        if (!sourcePicturePath.toFile().exists()) {
            return null;
        }

        // Getting the hashed name of the genre.
        String hashGenreName = HashUtil.getMd5Hash(fileName);

        // Generating the thumbnails.
        ThumbnailUtil.generateThumbs(sizes, thumbType.getBaseDestFolder(), sourcePicturePath, hashGenreName);

        return hashGenreName;
    }

    /**
     * Allows to generate a thumbnail with the given information.
     *
     * @param thumbSize   The size of the output thumbnail.
     * @param image       The image that must be reduced.
     * @param thumbFolder The folder containing the thumbnail.
     * @param thumbName   The name of the file without extension that will be created for the thumbnail.
     * @throws IOException Error during the generation of the image.
     */
    private static void generateThumb(ThumbSizeEnum thumbSize, Path image, Path thumbFolder,
                                      String thumbName) throws IOException {
        Path destination = getDestinationPath(thumbSize, thumbFolder, thumbName);
        // Generating the thumbnail with the desired size.
        Thumbnails.of(image.toFile())
                .size(thumbSize.getWidth(), thumbSize.getHeight())
                .toFile(destination.toFile());
    }

    /**
     * Get the destination path of the thumb given the size of the generated thumb and the thumb name.
     *
     * @param thumbSize   The size of the generated thumbnail.
     * @param thumbFolder The folder used to store the thumbnails.
     * @param thumbName   The name used for the thumbnail.
     * @return The path were the thumbnail will be stored.
     */
    private static Path getDestinationPath(ThumbSizeEnum thumbSize, Path thumbFolder, String thumbName) {
        // Creating the destination of the image.
        Path destination = thumbFolder.resolve(thumbSize.getFolderName());
        FileUtil.createDirectories(destination);
        // Adding the filename.
        return destination.resolve(thumbName + FileExtensionEnum.JGP.getExtension());
    }
}
