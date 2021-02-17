package org.manazeak.manazeak.controller.fragment.admin.syncthing;

import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.admin.AdminFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This fragment is used to display wishes for the admin.
 */
@FragmentController
public class SyncThingAdminFragment {

    @GetMapping("/admin/syncthing")
    public String getSyncThingFragment() {
        return AdminFragmentEnum.SYNCTHING.getPage();
    }
}
