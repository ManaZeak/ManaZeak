package org.manazeak.manazeak.controller.fragment.ui.scene.mainpage;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.manazeak.manazeak.service.library.artist.ArtistService;
import org.manazeak.manazeak.service.library.genre.GenreService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Allows to display the main page to the users.
 */
@FragmentController
public class MainPageController {

    private static final int NB_ELEMENTS = 10;
    private final ArtistService artistService;
    private final GenreService genreService;

    public MainPageController(ArtistService artistService, GenreService genreService) {
        this.artistService = artistService;
        this.genreService = genreService;
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/mainpage")
    public String getMainPage(Model model) {
        // Adding the artists
        model.addAttribute("rlArtists", artistService.getSomeRandomArtistMinimal(NB_ELEMENTS));
        model.addAttribute("genres", genreService.getSomeRandomGenreMinimal(NB_ELEMENTS));

        return UiFragmentEnum.MAIN_PAGE.getPage();
    }
}
