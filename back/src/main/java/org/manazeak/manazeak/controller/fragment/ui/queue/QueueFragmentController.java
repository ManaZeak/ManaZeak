package org.manazeak.manazeak.controller.fragment.ui.queue;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.ui.UiFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Allows to display the queue in the application.
 */
@FragmentController
public class QueueFragmentController {

    /**
     * @return The fragment displaying the tracks in the queue
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/entry/queueplayobject/")
    public String getQueuePlayObjectEntry() {
        return UiFragmentEnum.QUEUE_PLAY_OBJECT_ENTRY.getPage();
    }

    /**
     * @return The fragment displaying the track in the queue playing.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/entry/queuetrack/")
    public String getPage() {
        return UiFragmentEnum.QUEUE_TRACK_ENTRY.getPage();
    }

    /**
     * @return The fragment needed to display the context in the queue.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/context/queue/")
    public String getQueueContext() {
        return UiFragmentEnum.QUEUE_CONTEXT.getPage();
    }
}
