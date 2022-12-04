package org.manazeak.manazeak.controller.fragment.ui.album;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the album cover in full size
 */
@FragmentController
public class AlbumCoverModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/album-cover/")
    public String getPage() {
        return UiFragmentEnum.ALBUM_COVER_MODAL.getPage();
    }
}
