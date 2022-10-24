package org.manazeak.manazeak.manager.library.integration.label;

import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.daos.library.integration.label.LabelIntegrationDAO;
import org.manazeak.manazeak.daos.track.LabelDAO;
import org.manazeak.manazeak.entity.dto.library.integration.label.LabelPictureProjection;
import org.manazeak.manazeak.util.FieldUtil;
import org.manazeak.manazeak.util.HashUtil;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * Allows to generate the thumbnails of the label pictures.
 */
@Component
public class LabelPictureThumbManager {

    private static final int NB_THREADS = 5;

    private static final int BUFFER_SIZE = 500;

    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL, ThumbSizeEnum.MEDIUM, ThumbSizeEnum.SMALL
    };
    private static final Logger LOG = LoggerFactory.getLogger(LabelPictureThumbManager.class);
    private final LabelDAO labelDAO;

    private final LabelIntegrationDAO labelIntegrationDAO;

    public LabelPictureThumbManager(LabelDAO labelDAO, LabelIntegrationDAO labelIntegrationDAO) {
        this.labelDAO = labelDAO;
        this.labelIntegrationDAO = labelIntegrationDAO;
    }

    /**
     * Search all the labels that doesn't have a picture and try to generate the image.
     */
    public void generateLabelThumbs() {
        // Getting all the labels that doesn't have any cover.
        List<LabelPictureProjection> labels = labelDAO.getLabelsWithoutPicture();

        final ExecutorService executor = Executors.newFixedThreadPool(NB_THREADS);
        List<Future<Pair<Long, String>>> results = new ArrayList<>();
        // Launching the image thumb generation if the image exists and associating with the label.
        for (LabelPictureProjection label : labels) {
            results.add(executor.submit(launchLabelPictureThumbnailGeneration(label)));
        }

        executor.shutdown();

        // Processing the result of the function to update the database with the label picture info.
        updateLabelPictures(results);
        // No need to wait for the thread end, the threads results are used in the above function.
    }

    /**
     * Update the labels in the database with the information of the generated thumbnail.
     *
     * @param results The information returned by the execution.
     */
    private void updateLabelPictures(List<Future<Pair<Long, String>>> results) {
        List<Pair<Long, String>> buffer = new ArrayList<>();
        // Getting all the results and updating the database in bulk.
        try {
            for (Future<Pair<Long, String>> result : results) {
                // Getting the result value and skipping it if the value is null.
                Pair<Long, String> threadResult = result.get();
                if (threadResult == null) {
                    continue;
                }

                buffer.add(threadResult);
                // Launching the update of the labels in the database.
                if (buffer.size() > BUFFER_SIZE) {
                    labelIntegrationDAO.updateLabelPicture(buffer);
                    buffer.clear();
                }
            }
        } catch (InterruptedException | ExecutionException e) {
            LOG.error("The generation of the label thumb has been interrupted.", e);
            Thread.currentThread().interrupt();
        }

        // Checking if there is any result left.
        if (!buffer.isEmpty()) {
            labelIntegrationDAO.updateLabelPicture(buffer);
        }
    }

    /**
     * Generate the thumbnails of the given label if the picture exists on the FS.
     *
     * @param label The information about the label.
     * @return The id of the label and the name of the generated file.
     */
    private Callable<Pair<Long, String>> launchLabelPictureThumbnailGeneration(LabelPictureProjection label) {
        return () -> {
            // Checking if the label has a file in the label picture folder.
            String fsLabelName = FieldUtil.removeForbiddenFsChar(label.getName());
            Path labelPicturePath = LibraryConstant.LABEL_PICTURE_PATH.resolve(fsLabelName + FileExtensionEnum.JGP.getExtension());
            if (!labelPicturePath.toFile().exists()) {
                // No file found for this label, skipping this one.
                return null;
            }

            String hashLabelName = HashUtil.getMd5Hash(label.getName());
            // Generating the thumbnail.
            ThumbnailUtil.generateThumbs(LIST_THUMB_SIZE_TO_GENERATE, ResourcePathEnum.LABEL_PICTURE_FOLDER.getPath(), labelPicturePath, hashLabelName);

            // Returning the name associated with the id of the label.
            return Pair.of(label.getLabelId(), hashLabelName);
        };
    }

}
