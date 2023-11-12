package org.manazeak.manazeak.constant.library.artist;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Getter
public enum ArtistTypeEnum {
    BAND(1L, "band"),
    ARTIST(2L, "artist");

    private static final Map<String, ArtistTypeEnum> TYPE_MAP = new HashMap<>();

    // Initializing the map once.
    static {
        for (ArtistTypeEnum type : ArtistTypeEnum.values()) {
            TYPE_MAP.put(type.code, type);
        }
    }

    private final Long artistTypeId;
    private final String code;

    public static Long getArtistTypeIdByCode(String code) {
        ArtistTypeEnum type = TYPE_MAP.get(code);
        if (type == null) {
            return null;
        }
        return type.getArtistTypeId();
    }
}
