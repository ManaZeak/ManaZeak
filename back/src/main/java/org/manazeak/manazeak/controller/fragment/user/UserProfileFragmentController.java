package org.manazeak.manazeak.controller.fragment.user;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.user.UserFragmentEnum;
import org.manazeak.manazeak.service.security.user.info.UserInformationService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller is used to display the page containing the profile information of a user.
 */
@FragmentController
public class UserProfileFragmentController {

    /**
     * Service for getting the information of the user.
     */
    private final UserInformationService userInformationService;

    public UserProfileFragmentController(UserInformationService userInformationService) {
        this.userInformationService = userInformationService;
    }

    /**
     * Get the fragment containing the user information.
     *
     * @param model The model for passing the elements to the front.
     * @return The fragment to the front.
     */
    @GetMapping("/account/profile")
    @RestSecurity(PrivilegeEnum.PLAY)
    public String getUserProfileFragment(Model model) {
        model.addAttribute("userInfo", userInformationService.getCurrentUserInformation());
        return UserFragmentEnum.USER_PROFILE.getPage();
    }
}
