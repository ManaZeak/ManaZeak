package org.manazeak.manazeak.controller.html.fragment.user;

import org.manazeak.manazeak.controller.html.fragment.FragmentController;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * This controller is used to display the page containing the profile information of a user.
 */
@FragmentController
public class UserProfileFragmentController {

    @GetMapping("/user-profile")
    public String getUserProfileFragment() {
        return "fragments/user/userProfile.html";
    }
}
