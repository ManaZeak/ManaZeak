package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailErrorTypeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailErrorDto;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailGenerationProjection;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.integration.error.ThumbnailErrorManager;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Contains the base for generating the thumbnails in the application.
 */
@Slf4j
public abstract class AbstractThumbnailGenerator {

    private static final int BUFFER_SIZE = 500;
    @Autowired
    private ThumbnailErrorManager thumbnailErrorManager;

    /**
     * Generate the thumbnails for a type of data in the application.
     */
    public void generateThumbnails() {
        // Creating an executor for generating multiple thumbs at the same time.
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {

            // Setting the last element id.
            Long lastElementId = 0L;
            while (true) {
                // Building a pageable for the SQL request.
                Pageable pageable = PageRequest.of(0, BUFFER_SIZE);

                // Getting a packet of elements.
                List<ThumbnailGenerationProjection> elements = getElementsPacket(lastElementId, pageable);

                // If the list is empty, then exiting the loop.
                if (elements.isEmpty()) {
                    break;
                }

                // Adding the job to the thread pool.
                executor.submit(processThumbsPacket(elements));

                // Getting the last element of the list.
                lastElementId = elements.get(elements.size() - 1).getElementId();
            }

            // Stopping the thread pool.
            executor.shutdown();

            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                throw new MzkRuntimeException("The time out for the artist profile picture generation was reached, stopping.");
            }
        } catch (InterruptedException e) {
            log.error("Thread interrupted during the artist profile integration.", e);
            Thread.currentThread().interrupt();
        }
    }

    /**
     * @param lastId   The last id of the fetch element, used for buffering.
     * @param pageable The configuration for the SQL request.
     * @return Get a list of element to generate the thumbnails.
     */
    protected abstract List<ThumbnailGenerationProjection> getElementsPacket(Long lastId, Pageable pageable);

    /**
     * @return The list of size to generate the thumbnails.
     */
    protected abstract ThumbSizeEnum[] getThumbSizeToGenerate();

    /**
     * @return The type of thumbnails that are generated.
     */
    protected abstract ThumbnailTypeEnum getThumbType();

    /**
     * Save the entities in the database.
     *
     * @param results The list of element to update in the database.
     */
    protected abstract void saveEntities(List<Pair<Long, String>> results);

    /**
     * Handle a packet of thumb to be generated and saved in the database.
     *
     * @param thumbProjections The information needed to generate the thumbnail.
     * @return The runnable for processing a packet of thumbnails.
     */
    private Runnable processThumbsPacket(List<ThumbnailGenerationProjection> thumbProjections) {
        return () -> {
            try {
                List<Pair<Long, String>> results = new ArrayList<>();

                List<ThumbnailErrorDto> thumbnailErrors = new ArrayList<>();
                // Iterating through the thumbs to generate.
                for (ThumbnailGenerationProjection thumb : thumbProjections) {
                    Pair<Long, String> thumbGenerated = generateThumb(thumb, thumbnailErrors);
                    // Adding the thumbnail only if it has been generated.
                    if (thumbGenerated != null) {
                        results.add(thumbGenerated);
                    }
                }

                // Saving the errors in the database.
                thumbnailErrorManager.saveErrors(thumbnailErrors);
                // Saving the data into the database.
                saveEntities(results);
            } catch (Exception e) {
                log.error("Error when generating or saving the thumbnails.", e);
            }
        };
    }

    /**
     * Generate the thumbnail and return the element id linked to the thumbnail name.
     *
     * @param thumbProjection The information about the thumbnail.
     * @return The pair of : element id and thumbnail name.
     */
    private Pair<Long, String> generateThumb(ThumbnailGenerationProjection thumbProjection, List<ThumbnailErrorDto> thumbnailErrors) {
        try {
            // Generating the thumbnail and getting the hashed name.
            String thumbName = ThumbnailUtil.generateThumbnail(getThumbSizeToGenerate(), thumbProjection.getName(), getThumbType());

            // Returning the pair if it's not null.
            if (thumbName != null) {
                return Pair.of(thumbProjection.getElementId(), thumbName);
            }
        } catch (Exception e) {
            log.error("Error generating the thumbnail for the element : '" + thumbProjection.getName()
                    + "' for the type : " + getThumbType());
            thumbnailErrors.add(new ThumbnailErrorDto(getThumbType(), e.getMessage(), thumbProjection.getElementId(),
                    ThumbnailErrorTypeEnum.IMAGE_ERROR));
        }

        // Nothing as been generated, this is an error.
        thumbnailErrors.add(new ThumbnailErrorDto(getThumbType(), "[" + getThumbType() + "] The thumbnail wasn't found on the FS for the file : "
                + thumbProjection.getName(), thumbProjection.getElementId(), ThumbnailErrorTypeEnum.FILE_NOT_FOUND));
        return null;
    }
}
