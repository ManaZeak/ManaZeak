package org.manazeak.manazeak.controller.fragment.ui.context;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;
/* TODO move this in a ui.entry package but not sure to do it sorry squalala ... */
/**
 * Controller used to display the album cover in full size
 */
@FragmentController
public class QueueTrackEntryController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/entry/queuetrack/")
    public String getPage() {
        return UiFragmentEnum.QUEUE_TRACK_ENTRY.getPage();
    }
}