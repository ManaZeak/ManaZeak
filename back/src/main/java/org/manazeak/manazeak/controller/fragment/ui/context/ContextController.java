package org.manazeak.manazeak.controller.fragment.ui.context;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Contains the context menus of the application.
 */
@FragmentController
public class ContextController {

    /**
     * @return Display the context containing the playback rate slider.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/context/playbackrate/")
    public String getPlaybackRateContext() {
        return UiFragmentEnum.PLAYBACK_RATE_CONTEXT.getPage();
    }

    /**
     * @return Display the context menu for the tracks in the list.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/context/track/")
    public String getTrackContext() {
        return UiFragmentEnum.TRACK_CONTEXT.getPage();
    }

}
