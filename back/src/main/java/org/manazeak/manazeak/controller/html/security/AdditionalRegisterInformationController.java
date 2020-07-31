package org.manazeak.manazeak.controller.html.security;

import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.page.user.UserPageEnum;
import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.manazeak.manazeak.service.reference.country.CountryService;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.manazeak.manazeak.service.security.user.AdditionalInfoManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

/**
 * This controller handles the page for completing the user account creation.
 */
@Controller
public class AdditionalRegisterInformationController {

    private final AdditionalInfoManager additionalInfoManager;

    private final CountryService countryService;

    private final LocaleService localeService;

    public AdditionalRegisterInformationController(AdditionalInfoManager additionalInfoManager,
                                                   CountryService countryService, LocaleService localeService) {
        this.additionalInfoManager = additionalInfoManager;
        this.countryService = countryService;
        this.localeService = localeService;
    }

    /**
     * Render and display the page.
     *
     * @return the page containing the additional information of the user.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/additionalRegisterInfo")
    public String getAdditionalRegisterInfoPage(Model model) {
        UserFirstInfoDto userFirstInfoDto = new UserFirstInfoDto();
        // Adding the objects to the model
        model.addAttribute("userInfo", userFirstInfoDto);
        addCountriesToPage(model);
        addLocalesToPage(model);
        // Returning the page with the information.
        return UserPageEnum.ADDITIONAL_INFO.getPage();
    }

    /**
     * Handles the additional information addition to the user.
     *
     * @param userInfo the information of the user.
     * @param result   The information about the validation errors.
     * @return the redirection to the main page.
     */
    @Security(PrivilegeEnum.PLAY)
    @PostMapping("/additionalRegisterInfo")
    public String submitAdditionalRegisterInfoPage(@ModelAttribute("userInfo") @Valid UserFirstInfoDto userInfo,
                                                   BindingResult result, Model model) {
        if (result.hasErrors()) {
            addCountriesToPage(model);
            return UserPageEnum.ADDITIONAL_INFO.getPage();
        }
        // Adding the information to the user.
        additionalInfoManager.addUserInformation(userInfo);
        // Redirecting to the main page.
        return UserPageEnum.MAIN_PAGE.getRedirectToPage();
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
