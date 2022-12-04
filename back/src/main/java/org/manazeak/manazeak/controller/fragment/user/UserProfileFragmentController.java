package org.manazeak.manazeak.controller.fragment.user;

import jakarta.validation.Valid;
import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.fragment.JsonResponseHandler;
import org.manazeak.manazeak.controller.page.user.UserFragmentEnum;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.manazeak.manazeak.service.security.user.info.UserInformationService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * This controller is used to display the page containing the profile information of a user.
 */
@FragmentController
public class UserProfileFragmentController {

    /**
     * Service for getting the information of the user.
     */
    private final UserInformationService userInformationService;

    private final JsonResponseHandler jsonResponseHandler;

    public UserProfileFragmentController(UserInformationService userInformationService,
                                         JsonResponseHandler jsonResponseHandler) {
        this.userInformationService = userInformationService;
        this.jsonResponseHandler = jsonResponseHandler;
    }

    /**
     * Get the fragment containing the user information.
     *
     * @param model The model for passing the elements to the front.
     * @return The fragment to the front.
     */
    @RestSecurity(PrivilegeEnum.PLAY)
    @GetMapping("/account/profile/")
    public String getUserProfileFragment(Model model) {
        model.addAttribute("userInfo", userInformationService.getCurrentUserInformation());
        return UserFragmentEnum.USER_PROFILE.getPage();
    }

    /**
     * Get the fragment containing the information to edit the user information.
     *
     * @param model The model for passing the element to the front.
     * @return The fragment to the front.
     */
    @RestSecurity(PrivilegeEnum.PLAY)
    @GetMapping("/account/profile-edit/")
    public String getUserProfileEditFragment(Model model) {
        model.addAttribute("userInfo", userInformationService.getUserEditableInformation());
        return UserFragmentEnum.EDIT_ACCOUNT.getPage();
    }

    /**
     * Post the fragment containing the information to save for the user.
     *
     * @param editedUser The modified information of the user to be saved.
     * @param model      The model for passing the information to the front.
     * @param result     The information about the validation.
     * @return The fragment to the front.
     */
    @RestSecurity(PrivilegeEnum.PLAY)
    @PostMapping("/account/profile-edit/")
    public String saveProfileEditFragment(@ModelAttribute("userInfo") @Valid MzkUserEditDto editedUser,
                                          BindingResult result, Model model) {
        // Checking if the user send was validated.
        if (result.hasErrors()) {
            return UserFragmentEnum.EDIT_ACCOUNT.getPage();
        }
        // Applying the modification to the user.
        userInformationService.saveCurrentUserEditInformation(editedUser);
        // Sends the ok response, the account has been created successfully
        return jsonResponseHandler.prepareJsonSuccess("user.edit.log.title", "user.edit.log.message", model);
    }
}
