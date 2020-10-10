package org.manazeak.manazeak.datacreation.security.user;

import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * Allows to generate first information object for unit tests.
 */
@Component
public class UserFirstInfoDataCreation {

    /**
     * Generate a object with correct information.
     *
     * @param avatar optional avatar file for the user.
     * @return The object with the information.
     */
    public UserFirstInfoDto generateOkFirstInfo(MultipartFile avatar) {
        UserFirstInfoDto info = new UserFirstInfoDto();
        info.setBio(UserTestConstants.BIO);
        info.setBirthDate(UserTestConstants.BIRTH_DATE);
        info.setCountryId(UserTestConstants.COUNTRY_ID);
        info.setMail(UserTestConstants.MAIL);
        info.setLocaleId(UserTestConstants.LOCALE_ID);
        info.setName(UserTestConstants.NAME);
        info.setSurname(UserTestConstants.SURNAME);
        if (avatar != null) {
            info.setAvatar(avatar);
        }
        return info;
    }
}
