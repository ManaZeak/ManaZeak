package org.manazeak.manazeak.entity.dto.library.integration.testimony;

import lombok.Data;

@Data
public class TestimonyDto {

    /**
     * The artist who the testimony is about.
     */
    private String artistName;

    /**
     * The name of the artist who did this testimony.
     */
    private String from;

    /**
     * The testimony content.
     */
    private String text;

    /**
     * The code of the locale of the testimony.
     */
    private String locale;

    /**
     * The language the testimony is written.
     */
    private Long localeId;
}
