package org.manazeak.manazeak.controller.fragment.library.artist;

import jakarta.validation.constraints.NotNull;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.library.album.AlbumContributionTypeEnum;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.library.artist.ArtistFragmentEnum;
import org.manazeak.manazeak.service.library.album.AlbumService;
import org.manazeak.manazeak.service.library.artist.ArtistService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * Display the detail about an artist.
 */
@FragmentController
public class ArtistFragment {

    private final ArtistService artistService;

    private final AlbumService albumService;

    public ArtistFragment(ArtistService artistService, AlbumService albumService) {
        this.artistService = artistService;
        this.albumService = albumService;
    }

    /**
     * Get the information about an artist.
     *
     * @param artistId The id of the artist.
     * @return The template to display to the user containing the user information.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/artist/{artistId}/")
    public String getArtistDetailFragment(@PathVariable @NotNull(message = "general.error.no_id") Long artistId,
                                          Model model) {
        // Loading the artist.
        model.addAttribute("artist", artistService.getArtistDetail(artistId));
        model.addAttribute("albums", albumService.getMinimalAlbumByArtistId(artistId));
        model.addAttribute("contrib", albumService.getMinimalAlbumContributionByArtistId(artistId));
        model.addAttribute("contribType", AlbumContributionTypeEnum.class);

        return ArtistFragmentEnum.ARTIST_DETAIL.getPage();
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/release-artist/all/")
    public String getAllReleaseArtistFragment(Model model) {
        model.addAttribute("rlArtists", artistService.getAllReleaseArtistsMinimal());

        return ArtistFragmentEnum.ALL_RELEASE_ARTISTS.getPage();
    }

}
