package org.manazeak.manazeak.constant.library.thumbnail;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ThumbnailErrorTypeEnum {

    FILE_NOT_FOUND(1L),
    IMAGE_ERROR(2L);

    private final Long id;
}
