package org.manazeak.manazeak.controller.page.playlist;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Contains all the fragments related to playlists.
 */
@RequiredArgsConstructor
@Getter
public enum PlaylistFragmentEnum {

    /**
     * Fragment to display the playlists in the user aside.
     */
    PLAYLIST_ASIDE("fragments/playlist/playlist-aside.html"),
    PLAYLIST_INFO("fragments/playlist/playlist-info.html"),
    PLAYLIST_TRACKS("fragments/playlist/playlist-tracks.html");

    private final String page;
}
