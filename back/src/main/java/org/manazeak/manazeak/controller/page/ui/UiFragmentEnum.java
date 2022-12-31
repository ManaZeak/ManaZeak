package org.manazeak.manazeak.controller.page.ui;

/**
 * Contains the URLS for some UI components.
 */
public enum UiFragmentEnum {
    MAIN_PAGE("fragments/scene/mainpage.html"),
    MENU_PAGE("fragments/scene/menupage.html"),
    ALBUM_COVER_MODAL("fragments/modal/album-cover.html"),
    TRACK_DETAIL_MODAL("fragments/modal/track-detail.html"),
    ARTIST_PICTURE_MODAL("fragments/modal/artist-picture.html"),
    ABOUT_MODAL("fragments/modal/about.html"),
    QUEUE_CONTEXT("fragments/context/queue.html"),
    PLAYBACK_RATE_CONTEXT("fragments/context/playbackrate.html"),
    TRACK_CONTEXT("fragments/context/track.html"),
    QUEUE_TRACK_ENTRY("fragments/entry/queuetrack.html"),
    QUEUE_PLAY_OBJECT_ENTRY("fragments/entry/queueplayobject.html");

    private final String page;

    UiFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }
}
