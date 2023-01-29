package org.manazeak.manazeak.controller.fragment.ui.track;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.manazeak.manazeak.service.track.TrackService;
import org.manazeak.manazeak.entity.track.Track;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Display the details of a track
 */
@FragmentController
@RequiredArgsConstructor
public class TrackDetailModalController {

    private final TrackService trackService;

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/track-detail/{trackId}/")
    public String getPage(@PathVariable @NotNull(message = "general.error.no_id") Long trackId,
                                 Model model) {
        // Getting the track in the database.
        model.addAttribute("track", trackService.getTrackById(trackId));

        return UiFragmentEnum.TRACK_DETAIL_MODAL.getPage();
    }
}
