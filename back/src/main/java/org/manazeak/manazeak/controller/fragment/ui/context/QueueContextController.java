package org.manazeak.manazeak.controller.fragment.ui.context;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller used to display the album cover in full size
 */
@FragmentController
public class QueueContextController {

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/context/queue")
    public String getPage() {
        return UiFragmentEnum.QUEUE_CONTEXT.getPage();
    }
}
