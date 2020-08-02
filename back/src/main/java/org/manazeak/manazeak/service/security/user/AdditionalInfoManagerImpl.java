package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.manazeak.manazeak.entity.reference.Country;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.reference.country.CountryService;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.manazeak.manazeak.util.FieldUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * This class is used to fill the user with information provided after the login page.
 */
@Service
@TransactionnalWithRollback
public class AdditionalInfoManagerImpl implements AdditionalInfoManager {

    private static final Logger LOG = LoggerFactory.getLogger(AdditionalInfoManagerImpl.class);
    private final UserProfilePicManager profilePicManager;
    private final UserService userService;
    private final CountryService countryService;
    private final LocaleService localeService;

    public AdditionalInfoManagerImpl(UserProfilePicManager userProfilePicManager, UserService userService,
                                     CountryService countryService, LocaleService localeService) {
        this.profilePicManager = userProfilePicManager;
        this.userService = userService;
        this.countryService = countryService;
        this.localeService = localeService;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void addUserInformation(UserFirstInfoDto userInfo) {
        MzkUser user = userService.getCurrentUser();
        LOG.info("Adding the new information for the user ");
        // Save the profile pic into the filesystem.
        String profilePic = profilePicManager.saveUserAvatarIntoResources(userInfo.getAvatar(), user);
        // Fill the user with it's information.
        UserHelper.fillUserWithAdditionalInfo(user, userInfo, profilePic);
        // Link the user with his country.
        linkUserWithCountry(user, userInfo.getCountryId());
        // Link the user with his locale.
        linkUserWithLocale(user, userInfo.getLocaleId());
        // Saving the current user into the database.
        userService.saveUser(user);
    }

    /**
     * Adding the country to the user if any provided.
     *
     * @param user      The user that will be modified.
     * @param countryId The country id.
     */
    private void linkUserWithCountry(MzkUser user, Long countryId) {
        // If the country field is not set, then there is nothing to do.
        if (!FieldUtil.isIdFieldNotEmpty(countryId)) {
            return;
        }
        Country userCountry = countryService.getCountryById(countryId);
        user.setCountry(userCountry);
    }

    /**
     * Adding the locale to the user if any provided.
     *
     * @param user     The user that will be modified.
     * @param localeId The locale id.
     */
    private void linkUserWithLocale(MzkUser user, Long localeId) {
        // If the locale field is not set, the there is nothing to do.
        if (!FieldUtil.isIdFieldNotEmpty(localeId)) {
            return;
        }
        localeService.setUserLocale(localeId, user);
    }
}
