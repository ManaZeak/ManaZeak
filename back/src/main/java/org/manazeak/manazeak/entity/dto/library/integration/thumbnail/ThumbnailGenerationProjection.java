package org.manazeak.manazeak.entity.dto.library.integration.thumbnail;

/**
 * Contains the information needed to generate the thumbnail of an element of the application.
 */
public interface ThumbnailGenerationProjection {

    Long getElementId();

    String getName();

}
