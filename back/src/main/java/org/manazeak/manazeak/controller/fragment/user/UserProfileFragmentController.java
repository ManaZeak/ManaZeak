package org.manazeak.manazeak.controller.fragment.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.rest.RestSecurity;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.fragment.JsonResponseHandler;
import org.manazeak.manazeak.controller.page.user.UserFragmentEnum;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.manazeak.manazeak.service.reference.country.CountryService;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.manazeak.manazeak.service.security.user.info.UserInformationService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * This controller is used to display the page containing the profile information of a user.
 */
@FragmentController
@RequiredArgsConstructor
public class UserProfileFragmentController {

    /**
     * Service for getting the information of the user.
     */
    private final UserInformationService userInformationService;

    private final JsonResponseHandler jsonResponseHandler;

    private final LocaleService localeService;

    private final CountryService countryService;

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
     * Post the fragment containing the information to save for the user.
     *
     * @param userInfo The modified information of the user to be saved.
     * @param model    The model for passing the information to the front.
     * @param result   The information about the validation.
     * @return The fragment to the front.
     */
    @RestSecurity(PrivilegeEnum.PLAY)
    @PostMapping("/account/profile-edit/")
    public String saveProfileEditFragment(@RequestBody @Valid MzkUserEditDto userInfo,
                                          BindingResult result, Model model) {
        // Checking if the user send was validated.
        if (result.hasErrors()) {
            model.addAttribute("userInfo", userInfo);
            model.addAttribute("org.springframework.validation.BindingResult.userInfo", result);
            addLocalesToPage(model);
            addCountriesToPage(model);
            return UserFragmentEnum.EDIT_ACCOUNT_MODAL.getPage();
        }
        // Applying the modification to the user.
        userInformationService.saveCurrentUserEditInformation(userInfo);
        // Sends the ok response, the account has been created successfully
        return jsonResponseHandler.prepareJsonSuccess("user.edit.log.title", "user.edit.log.message", model);
    }

    /**
     * Adds to the model the countries contained in the database.
     *
     * @param model the model used by thymeleaf to render the page.
     */
    private void addCountriesToPage(Model model) {
        model.addAttribute("countries", countryService.getCountryList());
    }

    /**
     * Adds the locales to the model
     *
     * @param model the model used by thymeleaf to render the page.
     */
    private void addLocalesToPage(Model model) {
        model.addAttribute("locales", localeService.getAllLocales());
    }
}
