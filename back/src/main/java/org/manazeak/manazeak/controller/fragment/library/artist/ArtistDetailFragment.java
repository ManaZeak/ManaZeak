package org.manazeak.manazeak.controller.fragment.library.artist;

import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.library.artist.ArtistFragmentEnum;
import org.manazeak.manazeak.service.library.artist.ArtistService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.validation.constraints.NotNull;

/**
 * Display the detail about an artist.
 */
@FragmentController
public class ArtistDetailFragment {

    private final ArtistService artistService;

    public ArtistDetailFragment(ArtistService artistService) {
        this.artistService = artistService;
    }

    /**
     * Get the information about an artist.
     * @param artistId The id of the artist.
     * @return The template to display to the user containing the user information.
     */
    @GetMapping("/library/artist/{artistId}")
    public String getArtistDetailFragment(@PathVariable @NotNull(message = "user.wish.error.empty_id") Long artistId,
                                          Model model) {
        // Loading the artist.
        model.addAttribute("artist", artistService.getArtistDetail(artistId));

        return ArtistFragmentEnum.ARTIST_DETAIL.getPage();
    }

}
