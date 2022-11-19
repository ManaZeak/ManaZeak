package org.manazeak.manazeak.controller.page.library.genre;

/**
 * Contains the pages of the artist.
 */
public enum GenreFragmentEnum {

    GENRE_GRAPH("fragments/library/genre/genre-graph.html"),
    GENRE_VIEW("fragments/library/genre/genre-detail.html"),
    ALL_GENRES("fragments/library/genre/all-genres.html");

    private final String page;

    GenreFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }

}
