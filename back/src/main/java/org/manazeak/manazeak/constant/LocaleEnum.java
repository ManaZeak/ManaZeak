package org.manazeak.manazeak.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Contains the available locale for users in the application.
 */
@RequiredArgsConstructor
@Getter
public enum LocaleEnum {

    FRENCH(1L),
    ENGLISH(2L);

    private final Long id;
}
