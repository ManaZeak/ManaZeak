package org.manazeak.manazeak.entity.dto.library.integration.bio;

import lombok.Data;

/**
 * Contains the information need to insert a bio into the database.
 */
@Data
public class BioDto {
    private Long localeId;
    private String locale;
    private String text;
    private String artistName;

}
