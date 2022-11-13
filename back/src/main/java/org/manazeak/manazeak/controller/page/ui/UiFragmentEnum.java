package org.manazeak.manazeak.controller.page.ui;

/**
 * Contains the URLS for some UI components.
 */
public enum UiFragmentEnum {
    MAIN_PAGE("fragments/scene/mainpage.html"),
    MENU_PAGE("fragments/scene/menupage.html"),
    ALBUM_COVER_MODAL("fragments/modal/album-cover.html"),
    ARTIST_PICTURE_MODAL("fragments/modal/artist-picture.html"),
    ABOUT_MODAL("fragments/modal/about.html");

    private final String page;

    UiFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
