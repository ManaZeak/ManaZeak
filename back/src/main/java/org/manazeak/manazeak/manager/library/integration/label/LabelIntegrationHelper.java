package org.manazeak.manazeak.manager.library.integration.label;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.daos.track.LabelDAO;
import org.manazeak.manazeak.entity.dto.library.integration.label.LabelIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.track.Label;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.database.PkIdProvider;

import java.util.HashMap;
import java.util.Map;

/**
 * Allows storing and preparing the objects before the database insertion of the labels.
 */
@RequiredArgsConstructor
public class LabelIntegrationHelper {

    @Getter
    private final Map<String, LabelIntegrationDto> labels = new HashMap<>();

    /**
     * The cache access object.
     */
    private final CacheAccessManager cacheAccessManager;

    private final LabelDAO labelDAO;

    /**
     * Extract a label from the album information.
     *
     * @param album The information about the album.
     */
    public void extractLabelFromAlbum(ExtractedAlbumDto album) {
        String label = album.getLabel();
        // If the label exist already in the map, nothing to do.
        if (!labels.containsKey(label)) {
            addNewLabel(label);
        }
    }

    private void addNewLabel(String labelName) {
        // Creating a new label.
        final LabelIntegrationDto label = new LabelIntegrationDto();
        label.setLabelId(cacheAccessManager.getLongValue(CacheEnum.LABEL_ID_BY_NAME, labelName));
        label.setName(labelName);

        // If the artist isn't in the database, getting a new id.
        if (label.getLabelId() == null) {
            label.setLabelId(labelDAO.getLabelIdByName(labelName)
                    .orElseGet(() -> PkIdProvider.singleton().getNewPkId(Label.class)));
            cacheAccessManager.put(CacheEnum.LABEL_ID_BY_NAME, labelName, label.getLabelId());
        }

        // Adding the label into the map.
        labels.put(labelName, label);
    }
}
