package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailErrorTypeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.label.LabelIntegrationDAO;
import org.manazeak.manazeak.daos.track.LabelDAO;
import org.manazeak.manazeak.entity.dto.library.integration.label.LabelPictureProjection;
import org.manazeak.manazeak.manager.library.integration.error.ThumbnailErrorManager;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * Allows to generate the thumbnails of the label pictures.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class LabelPictureThumbManager {

    private static final int NB_THREADS = 5;
    private static final int BUFFER_SIZE = 500;
    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL, ThumbSizeEnum.MEDIUM, ThumbSizeEnum.SMALL
    };
    private static final ThumbnailTypeEnum THUMB_TYPE = ThumbnailTypeEnum.LABEL;

    private final LabelDAO labelDAO;
    private final LabelIntegrationDAO labelIntegrationDAO;
    private final ThumbnailErrorManager thumbnailErrorManager;


    /**
     * Generate the thumbnails of the given label if the picture exists on the FS.
     *
     * @param label The information about the label.
     * @return The id of the label and the name of the generated file.
     */
    private Callable<Pair<Long, String>> launchLabelPictureThumbnailGeneration(LabelPictureProjection label) {
        return () -> {
            String thumbName = ThumbnailUtil.generateThumbnail(LIST_THUMB_SIZE_TO_GENERATE, label.getName(), THUMB_TYPE);
            if (thumbName == null) {
                thumbnailErrorManager.addErrorForEntity(THUMB_TYPE, "The label thumbnail wasn't found on the FS for the file : " + label.getName(), label.getLabelId(), ThumbnailErrorTypeEnum.FILE_NOT_FOUND);
                return null;
            }

            // Returning the name associated with the id of the label.
            return Pair.of(label.getLabelId(), thumbName);
        };
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
            log.error("The generation of the label thumb has been interrupted.", e);
            Thread.currentThread().interrupt();
        }

        // Checking if there is any result left.
        if (!buffer.isEmpty()) {
            labelIntegrationDAO.updateLabelPicture(buffer);
        }
    }

}
