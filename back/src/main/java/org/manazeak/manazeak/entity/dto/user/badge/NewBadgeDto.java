package org.manazeak.manazeak.entity.dto.user.badge;

/**
 * Contains the information about a badge that will be created
 */
public class NewBadgeDto {

    /**
     * The label of the badge.
     */
    private String label;

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
