package org.manazeak.manazeak.controller.fragment.user;

import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.response.ResponseFragmentEnum;
import org.manazeak.manazeak.controller.page.user.UserFragmentEnum;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.manazeak.manazeak.service.message.MessageManager;
import org.manazeak.manazeak.service.security.user.info.UserInformationService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.validation.Valid;

/**
 * This controller is used to display the page containing the profile information of a user.
 */
@FragmentController
public class UserProfileFragmentController {

    /**
     * Service for getting the information of the user.
     */
    private final UserInformationService userInformationService;

    private final MessageManager messageManager;

    public UserProfileFragmentController(UserInformationService userInformationService, MessageManager messageManager) {
        this.userInformationService = userInformationService;
        this.messageManager = messageManager;
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

    /**
     * Get the fragment containing the information to edit the user information.
     *
     * @param model The model for passing the element to the front.
     * @return The fragment to the front.
     */
    @GetMapping("/account/profile-edit")
    @RestSecurity(PrivilegeEnum.PLAY)
    public String getUserProfileEditFragment(Model model) {
        model.addAttribute("userInfo", userInformationService.getUserEditableInformation());
        return UserFragmentEnum.EDIT_ACCOUNT.getPage();
    }

    /**
     * Post the fragment containing the information to save for the user.
     *
     * @param editedUser The modified information of the user to be saved.
     * @param model      The model for passing the information to the front.
     * @return The fragment to the front.
     */
    public String saveProfileEditFragment(@ModelAttribute("userInfo") @Valid MzkUserEditDto editedUser,
                                          BindingResult result, Model model) {
        // Checking if the user send was validated.
        if (result.hasErrors()) {
            return UserFragmentEnum.EDIT_ACCOUNT.getPage();
        }
        // Adding the information for the JSON return
        model.addAttribute("title", messageManager.getMessage("user.edit.log.message"));
        model.addAttribute("message", messageManager.getMessage("user.edit.log.title"));
        // Returns a JSON with the status.
        return ResponseFragmentEnum.SUCCESS_RESPONSE.getPage();
    }
}
