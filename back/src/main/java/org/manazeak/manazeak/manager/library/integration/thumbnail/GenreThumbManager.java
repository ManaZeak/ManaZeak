package org.manazeak.manazeak.manager.library.integration.thumbnail;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailErrorTypeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.daos.library.integration.genre.GenrePictureIntegrationDAO;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenrePictureProjection;
import org.manazeak.manazeak.manager.library.integration.error.ThumbnailErrorManager;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles the generation of the thumbnails for the genre of the application.
 */
@Component
@RequiredArgsConstructor
public class GenreThumbManager {

    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL, ThumbSizeEnum.MEDIUM, ThumbSizeEnum.SMALL
    };
    private static final ThumbnailTypeEnum THUMB_TYPE = ThumbnailTypeEnum.GENRE;

    private final GenreDAO genreDAO;
    private final GenrePictureIntegrationDAO genrePictureIntegrationDAO;
    private final ThumbnailErrorManager thumbnailErrorManager;


    /**
     * Generate the thumbnails of the genres.
     */
    public void generateGenreThumbs() {
        // Getting the list of the genres.
        List<GenrePictureProjection> genres = genreDAO.getGenresPictureProjection();

        List<Pair<Long, String>> results = new ArrayList<>();
        // Iterating through the genres and generating the thumbnails.
        for (GenrePictureProjection genre : genres) {
            try {
                Pair<Long, String> result = generateGenreThumbnails(genre);
                // Adding to the list of thumb to save only if the thumbnails exists.
                if (result != null) {
                    results.add(result);
                }
            } catch (Exception e) {
                thumbnailErrorManager.addErrorForEntity(THUMB_TYPE, e.getMessage(), genre.getGenreId(), ThumbnailErrorTypeEnum.IMAGE_ERROR);
            }
        }

        genrePictureIntegrationDAO.updateGenrePictures(results);
    }

    /**
     * Generate the thumbnail if the genre exists in the FS.
     *
     * @param genre The information on the genre to generate the thumbnails.
     * @return The pair of genre id linked to the genre name.
     */
    private Pair<Long, String> generateGenreThumbnails(GenrePictureProjection genre) throws IOException {
        String thumb = ThumbnailUtil.generateThumbnail(LIST_THUMB_SIZE_TO_GENERATE, genre.getName(), THUMB_TYPE);
        if (thumb == null) {
            thumbnailErrorManager.addErrorForEntity(THUMB_TYPE, "The genre thumbnail wasn't found on the FS for the file : " + genre.getName(), genre.getGenreId(), ThumbnailErrorTypeEnum.FILE_NOT_FOUND);
            return null;
        }
        return Pair.of(
                genre.getGenreId(),
                thumb
        );
    }
}
