package org.manazeak.manazeak.manager.library.integration.genre;

import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.constant.file.ThumbSizeEnum;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.daos.library.integration.genre.GenrePictureIntegrationDAO;
import org.manazeak.manazeak.daos.track.GenreDAO;
import org.manazeak.manazeak.entity.dto.library.integration.genre.GenrePictureProjection;
import org.manazeak.manazeak.util.FieldUtil;
import org.manazeak.manazeak.util.HashUtil;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles the generation of the thumbnails for the genre of the application.
 */
@Component
public class GenreThumbManager {

    private static final ThumbSizeEnum[] LIST_THUMB_SIZE_TO_GENERATE = {
            ThumbSizeEnum.ORIGINAL, ThumbSizeEnum.MEDIUM, ThumbSizeEnum.SMALL
    };

    private final GenreDAO genreDAO;

    private final GenrePictureIntegrationDAO genrePictureIntegrationDAO;

    public GenreThumbManager(GenreDAO genreDAO, GenrePictureIntegrationDAO genrePictureIntegrationDAO) {
        this.genreDAO = genreDAO;
        this.genrePictureIntegrationDAO = genrePictureIntegrationDAO;
    }

    /**
     * Generate the thumbnail if the genre exists in the FS.
     *
     * @param genre The information on the genre to generate the thumbnails.
     * @return The pair of genre id linked to the genre name.
     */
    private static Pair<Long, String> generateGenreThumbnails(GenrePictureProjection genre) {
        // Check if the genre picture exists on the FS.
        String fsGenreName = FieldUtil.removeForbiddenFsChar(genre.getName());
        Path genrePicturePath = LibraryConstant.GENRE_PICTURE_PATH
                .resolve(fsGenreName + FileExtensionEnum.JGP.getExtension());
        if (!genrePicturePath.toFile().exists()) {
            return null;
        }

        // Getting the hashed name of the genre.
        String hashGenreName = HashUtil.getMd5Hash(genre.getName());

        // Generating the thumbnails.
        ThumbnailUtil.generateThumbs(LIST_THUMB_SIZE_TO_GENERATE, ResourcePathEnum.GENRE_PICTURE_FOLDER.getPath(),
                genrePicturePath, hashGenreName);

        return Pair.of(genre.getGenreId(), hashGenreName);
    }

    /**
     * Generate the thumbnails of the genres.
     */
    public void generateGenreThumbs() {
        // Getting the list of the genres.
        List<GenrePictureProjection> genres = genreDAO.getGenresPictureProjection();

        List<Pair<Long, String>> results = new ArrayList<>();
        // Iterating through the genres and generating the thumbnails.
        for (GenrePictureProjection genre : genres) {
            Pair<Long, String> result = generateGenreThumbnails(genre);
            // Adding to the list of thumb to save only if the thumbnails exists.
            if (result != null) {
                results.add(result);
            }
        }

        genrePictureIntegrationDAO.updateGenrePictures(results);
    }
}
