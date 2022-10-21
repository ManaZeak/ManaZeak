package org.manazeak.manazeak.controller.fragment.library.genre;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.library.genre.GenreFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Display the detail about an artist.
 */
@FragmentController
public class GenreGraphFragment {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/genre/genre-graph.html")
    public String getPage() {
        return GenreFragmentEnum.GENRE_GRAPH.getPage();
    }
}
