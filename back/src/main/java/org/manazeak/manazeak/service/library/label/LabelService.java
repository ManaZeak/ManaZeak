package org.manazeak.manazeak.service.library.label;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.track.LabelDAO;
import org.manazeak.manazeak.entity.dto.library.label.LabelCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.library.label.LabelMinimalInfoDto;
import org.manazeak.manazeak.entity.track.Label;
import org.manazeak.manazeak.exception.MzkExceptionHelper;
import org.manazeak.manazeak.manager.library.album.AlbumManager;
import org.manazeak.manazeak.manager.library.artist.ArtistManager;
import org.manazeak.manazeak.manager.library.random.label.RandomLabelManager;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Allows to manipulate the label in the service.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class LabelService {

    private final RandomLabelManager randomLabelManager;
    private final LabelDAO labelDAO;
    private final ArtistManager artistManager;
    private final AlbumManager albumManager;

    /**
     * Get a number of random labels from the database.
     *
     * @param nbLabels The number of labels to get from the database.
     * @return The list of minimal label fetched from the databaes.
     */
    public List<LabelMinimalInfoDto> getSomeRandomLabelsMinimal(int nbLabels) {
        return randomLabelManager.getRandomElements(nbLabels);
    }

    /**
     * Get a label by its id. Throw an exception id the id doesn't exists in the database.
     * @param labelId The identifier of the label.
     * @return The label found in the database.
     */
    public Label getLabelById(Long labelId) {
        return labelDAO.findById(labelId).orElseThrow(MzkExceptionHelper.generateSupplierObjectNotFoundException("user.track.not_found"));
    }

    /**
     * Get all the information needed to display a label.
     *
     * @param labelId The identifier of the label to display.
     * @return The complete label information.
     */
    public LabelCompleteInfoDto getLabelDetail(Long labelId) {
        Label label = getLabelById(labelId);
        return new LabelCompleteInfoDto(
                label.getLabelId(),
                label.getName(),
                label.getPictureFilename(),
                artistManager.getMinimalArtistsFromLabelId(labelId),
                albumManager.getLabelAlbums(labelId)
        );
    }

}
