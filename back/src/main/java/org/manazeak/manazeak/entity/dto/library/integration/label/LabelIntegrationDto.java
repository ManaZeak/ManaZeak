package org.manazeak.manazeak.entity.dto.library.integration.label;

/**
 * Contains the information about the label.
 */
public class LabelIntegrationDto {

    private Long labelId;

    private String name;

    public Long getLabelId() {
        return labelId;
    }

    public void setLabelId(Long labelId) {
        this.labelId = labelId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
