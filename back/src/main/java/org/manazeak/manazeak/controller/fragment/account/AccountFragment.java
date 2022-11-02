package org.manazeak.manazeak.controller.fragment.account;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.account.AccountFragmentEnum;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This fragment is used to display the admin page to any user that is an admin.
 */
@FragmentController
public class AccountFragment {

    /**
     * Get the account page skeleton.
     *
     * @return The skeleton of the account page.
     */
    @RestSecurity(PrivilegeEnum.PLAY)
    @GetMapping("/account")
    public String getAccountDetail() {
        return AccountFragmentEnum.ACCOUNT_PAGE.getPage();
    }

}
