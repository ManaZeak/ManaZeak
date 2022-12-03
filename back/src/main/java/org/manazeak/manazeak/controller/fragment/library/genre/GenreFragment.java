package org.manazeak.manazeak.controller.fragment.library.genre;

import jakarta.validation.constraints.NotNull;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.library.genre.GenreFragmentEnum;
import org.manazeak.manazeak.service.library.genre.GenreService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * Display the detail about an artist.
 */
@FragmentController
public class GenreFragment {

    private final GenreService genreService;

    public GenreFragment(GenreService genreService) {
        this.genreService = genreService;
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/genre/genre-graph.html/")
    public String getGenreGraphFragment() {
        return GenreFragmentEnum.GENRE_GRAPH.getPage();
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/genre/{genreId}/")
    public String getGenreViewFragment(@PathVariable @NotNull(message = "general.error.no_id") Long genreId,
                                       Model model) {
        model.addAttribute("genre", genreService.getGenreDetailById(genreId));

        return GenreFragmentEnum.GENRE_VIEW.getPage();
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/genre/all/")
    public String getAllGenreViewFragment(Model model) {
        model.addAttribute("genres", genreService.getAllRandomGenreMinimal());

        return GenreFragmentEnum.ALL_GENRES.getPage();
    }
}
