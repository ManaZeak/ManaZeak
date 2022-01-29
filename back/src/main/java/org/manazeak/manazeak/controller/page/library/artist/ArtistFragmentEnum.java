package org.manazeak.manazeak.controller.page.library.artist;

/**
 * Contains the pages of the artist.
 */
public enum ArtistFragmentEnum {

    ARTIST_DETAIL("fragments/library/artist/artist-detail.html");

    private final String page;

    ArtistFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }

}
