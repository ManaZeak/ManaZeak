package org.manazeak.manazeak.constant.library.moodbar;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MoodbarSizeEnum {
    LOW(1000, "ld"),
    HIGH(3000, "std"),
    ULTRA(5000, "hd");

    private final int size;

    private final String folderName;
}

