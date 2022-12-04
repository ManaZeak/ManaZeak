package org.manazeak.manazeak.controller.fragment.account.preference;

import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.account.AccountFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This fragment is used to display wishes for the admin.
 */
@FragmentController
public class PreferenceAccountFragment {

    @GetMapping("/account/preference/")
    public String getPreferenceFragment() {
        return AccountFragmentEnum.PREFERENCE.getPage();
    }
}
