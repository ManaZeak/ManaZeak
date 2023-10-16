package org.manazeak.manazeak.constant.library.website;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

/**
 * Contains the possible website to display into the application.
 */
@RequiredArgsConstructor
public enum WebsiteTypeEnum {
    WIKIPEDIA(1L, "wikipedia"),
    DISCOGS(2L, "discogs"),
    LAST_FM(3L, "lastfm");

    private static final Map<String, WebsiteTypeEnum> WEBSITE_TYPE_MAP = new HashMap<>();

    // Initializing the map once.
    static {
        for (WebsiteTypeEnum type : WebsiteTypeEnum.values()) {
            WEBSITE_TYPE_MAP.put(type.code, type);
        }
    }

    private final Long id;
    private final String code;

    /**
     * Get the website type from its code.
     *
     * @param code The website code to find.
     * @return The website type id.
     */
    public static Long getWebsiteTypeByCode(String code) {
        return WEBSITE_TYPE_MAP.get(code).id;
    }

}
