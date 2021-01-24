package org.manazeak.manazeak.controller.html.fragment.account;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.account.AccountFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This fragment is used to display the admin page to any user that is an admin.
 */
@FragmentController
public class AccountFragment {

    @RestSecurity(PrivilegeEnum.PLAY)
    @GetMapping("/account")
    public String getMainPage() {
        return AccountFragmentEnum.ACCOUNT_PAGE.getPage();
    }
}
