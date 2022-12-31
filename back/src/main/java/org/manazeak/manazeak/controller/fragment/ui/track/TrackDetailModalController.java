package org.manazeak.manazeak.controller.fragment.ui.track;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the album cover in full size
 */
@FragmentController
public class TrackDetailModalController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/track-detail/")
    public String getPage() {
        return UiFragmentEnum.TRACK_DETAIL_MODAL.getPage();
    }
}
