package org.manazeak.manazeak.controller.fragment.user;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.user.UserFragmentEnum;
import org.manazeak.manazeak.service.reference.country.CountryService;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.manazeak.manazeak.service.security.user.info.UserInformationService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Contains the different modals displayed to the user on the user information.
 */
@FragmentController
@RequiredArgsConstructor
public class UserModalController {

    private final UserInformationService userInformationService;

    private final CountryService countryService;

    private final LocaleService localeService;

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/reset-password/")
    public String getResetPasswordModal() {
        return UserFragmentEnum.RESET_PASSWORD_MODAL.getPage();
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/edit-account/")
    public String getEditAccountModal(Model model) {
        // Adding the objects to the model
        model.addAttribute("userInfo", userInformationService.getUserEditableInformation());
        addCountriesToPage(model);
        addLocalesToPage(model);        
        return UserFragmentEnum.EDIT_ACCOUNT_MODAL.getPage();
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
