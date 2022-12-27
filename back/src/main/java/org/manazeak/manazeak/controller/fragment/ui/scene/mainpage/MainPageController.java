package org.manazeak.manazeak.controller.fragment.ui.scene.mainpage;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.manazeak.manazeak.service.library.artist.ArtistService;
import org.manazeak.manazeak.service.library.genre.GenreService;
import org.manazeak.manazeak.service.library.label.LabelService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * Allows to display the main page to the users.
 */
@FragmentController
@RequiredArgsConstructor
public class MainPageController {

    private static final int NB_ELEMENTS = 10;
    private final ArtistService artistService;
    private final GenreService genreService;
    private final LabelService labelService;

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/mainpage/")
    public String getMainPage(Model model) {
        addMainPageAttributes(NB_ELEMENTS, model);

        return UiFragmentEnum.MAIN_PAGE.getPage();
    }

    /**
     * Return the main page fragment with the number element specified.
     * No more than 50 element per category can be asked.
     *
     * @param numberOfElement The number of element to return in each section.
     * @param model           The model to pass to thymeleaf to fill the template.
     * @return The address of the page to use.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/mainpage/{numberOfElement}/")
    public String getMainPageWithNumberOfElements(@PathVariable @Valid @NotNull @Max(50) Integer numberOfElement, Model model) {
        addMainPageAttributes(numberOfElement, model);

        return UiFragmentEnum.MAIN_PAGE.getPage();
    }

    private void addMainPageAttributes(int numberOfElements, Model model) {
        model.addAttribute("rlArtists", artistService.getSomeRandomArtistMinimal(numberOfElements));
        model.addAttribute("genres", genreService.getSomeRandomGenreMinimal(numberOfElements));
        model.addAttribute("labels", labelService.getSomeRandomLabelsMinimal(numberOfElements));
    }
}
