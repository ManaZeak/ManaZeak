package org.manazeak.manazeak.entity.dto.user.badge;

import lombok.Data;

/**
 * Contains the information about a badge that will be created
 */
@Data
public class NewBadgeDto {

    /**
     * The label of the badge.
     */
    private String label;
}
