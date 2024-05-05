package org.manazeak.manazeak.manager.security.user;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.user.MzkUserEditDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.service.reference.country.CountryService;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.manazeak.manazeak.util.DateUtil;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

/**
 * Allows to transform a user into a edit user.
 */
@Component
@RequiredArgsConstructor
public class UserEditManager {

    private final UserManager userManager;

    private final CountryService countryService;

    private final LocaleService localeService;

    private final CacheManager cacheManager;


    /**
     * Get the object to display the user in edit mode.
     *
     * @return The object that will be used to display the edit page.
     */
    public MzkUserEditDto getCurrentUserEdit() {
        // Getting the user that is connected.
        MzkUser user = userManager.getCurrentUser();

        // Transforming the user into the editable object.
        MzkUserEditDto userEdit = new MzkUserEditDto();
        userEdit.setSurname(user.getSurname());
        userEdit.setBio(user.getBio());
        userEdit.setBirthdate(DateUtil.formatDate(user.getBirthDate(), DateUtil.US_DATE_FORMATTER));
        userEdit.setEmail(user.getMail());
        userEdit.setName(user.getName());
        if (user.getCountry() != null) {
            userEdit.setCountryId(user.getCountry().getCountryId());
        }
        if (user.getLocale() != null) {
            userEdit.setLocaleId(user.getLocale().getLocaleId());
        }

        return userEdit;
    }

    /**
     * Allows saving the modified user with the information send by the user.
     *
     * @param editedUser The information modified by the user.
     */
    public void saveCurrentUserModification(MzkUserEditDto editedUser) {
        // Getting the current user connected
        MzkUser user = userManager.getCurrentUser();

        // Evicting the cache for the locale resolution.
        CacheEnum.getCache(CacheEnum.USER_LOCALE, cacheManager).evict(user.getUserId());

        // Setting the new fields on the user.
        user.setSurname(editedUser.getSurname());
        user.setBio(editedUser.getBio());
        user.setBirthDate(DateUtil.parseString(editedUser.getBirthdate(), DateUtil.US_DATE_FORMATTER));
        user.setMail(editedUser.getEmail());
        user.setName(editedUser.getName());
        if (editedUser.getCountryId() != 0L) {
            user.setCountry(countryService.getCountryById(editedUser.getCountryId()));
        }
        localeService.setUserLocale(editedUser.getLocaleId(), user);

        // Saving the information
        userManager.saveUser(user);
    }
}
