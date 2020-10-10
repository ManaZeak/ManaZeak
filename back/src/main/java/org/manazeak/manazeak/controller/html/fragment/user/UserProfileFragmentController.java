package org.manazeak.manazeak.controller.html.fragment.user;

import org.manazeak.manazeak.controller.html.fragment.FragmentController;
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
    @GetMapping("/user-profile")
    public String getUserProfileFragment(Model model) {
        model.addAttribute("userInfo", userInformationService.getCurrentUserInformation());
        return UserFragmentEnum.USER_INFORMATION.getPage();
    }
}
