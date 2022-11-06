package org.manazeak.manazeak.controller.page.library.album;

public enum AlbumFragmentEnum {

    ALBUM_DETAIL("fragments/library/album/album-detail.html");

    private final String page;

    AlbumFragmentEnum(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }

}

