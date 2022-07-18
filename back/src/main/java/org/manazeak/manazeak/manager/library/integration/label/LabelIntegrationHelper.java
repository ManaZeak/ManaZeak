package org.manazeak.manazeak.manager.library.integration.label;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.integration.label.LabelIntegrationDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.track.Label;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.database.PkIdProvider;

import java.util.HashMap;
import java.util.Map;

/**
 * Allows to store an prepare the objects before the database insertion of the labels.
 */
public class LabelIntegrationHelper {

    private final Map<String, LabelIntegrationDto> labels = new HashMap<>();

    /**
     * The cache access object.
     */
    private final CacheAccessManager cacheAccessManager;

    public LabelIntegrationHelper(CacheAccessManager cacheAccessManager) {
        this.cacheAccessManager = cacheAccessManager;
    }

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

    public Map<String, LabelIntegrationDto> getLabels() {
        return labels;
    }

    private void addNewLabel(String labelName) {
        // Creating a new label.
        final LabelIntegrationDto label = new LabelIntegrationDto();
        label.setLabelId(cacheAccessManager.getLongValue(CacheEnum.LABEL_ID_BY_NAME, labelName));
        label.setName(labelName);

        // If the artist isn't in the database, getting a new id.
        if (label.getLabelId() == null) {
            label.setLabelId(PkIdProvider.singleton().getNewPkId(Label.class));
            cacheAccessManager.put(CacheEnum.LABEL_ID_BY_NAME, labelName, label.getLabelId());
        }

        // Adding the label into the map.
        labels.put(labelName, label);
    }
}
