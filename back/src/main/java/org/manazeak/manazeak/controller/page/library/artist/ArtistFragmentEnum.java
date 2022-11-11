package org.manazeak.manazeak.controller.page.library.artist;

/**
 * Contains the pages of the artist.
 */
public enum ArtistFragmentEnum {

    ARTIST_DETAIL("fragments/library/artist/artist-detail.html"),
    ALL_RELEASE_ARTISTS("fragments/library/artist/all-release-artists.html");


    private final String page;

    ArtistFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }

}
