package org.manazeak.manazeak.entity.dto.library.integration.testimony;

import lombok.Data;

@Data
public class TestimonyDto {

    /**
     * The identifier that will be used in the database when inserting it.
     */
    private Long testimonyId;

    /**
     * The artist who the testimony is about.
     */
    private String artistName;

    /**
     * The artist from who originated the testimony.
     */
    private Long fromArtistId;

    /**
     * The name of the artist who did this testimony.
     */
    private String from;

    /**
     * The testimony content.
     */
    private String text;

    /**
     * The language the testimony is written.
     */
    private Long localeId;
}
