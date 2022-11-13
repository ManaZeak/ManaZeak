package org.manazeak.manazeak.controller.fragment.ui.artist;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the album cover in full size
 */
@FragmentController
public class ArtistPictureModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/artist-picture")
    public String getPage() {
        return UiFragmentEnum.ARTIST_PICTURE_MODAL.getPage();
    }
}
