package org.manazeak.manazeak.entity.dto.library.integration.thumbnail;

import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailErrorTypeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;

/**
 * Contains the data needed to build an error.
 */
public record ThumbnailErrorDto(ThumbnailTypeEnum type, String error, Long entityId, ThumbnailErrorTypeEnum errorType) {

}
