package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.entity.dto.user.UserFirstInfoDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.util.DateUtil;
import org.manazeak.manazeak.util.FieldUtil;

/**
 * Util class for operation on the users.
 */
public final class UserHelper {

    private UserHelper() {

    }

    /**
     * Fill a user object with auxiliary information.
     *
     * @param user     the user that would be filled.
     * @param userInfo the information from the page.
     */
    public static void fillUserWithAdditionalInfo(MzkUser user, UserFirstInfoDto userInfo, String profilePic) {
        // Setting the fields only if it's not empty.
        if (FieldUtil.checkStringNotEmpty(userInfo.getMail())) {
            user.setMail(userInfo.getMail());
        }
        if (FieldUtil.checkStringNotEmpty(userInfo.getBio())) {
            user.setBio(userInfo.getBio());
        }
        if (FieldUtil.checkStringNotEmpty(userInfo.getBirthDate())) {
            user.setBirthDate(DateUtil.parseString(userInfo.getBirthDate(), DateUtil.US_DATE_FORMATTER));
        }
        if (FieldUtil.checkStringNotEmpty(userInfo.getName())) {
            user.setName(userInfo.getName());
        }
        if (FieldUtil.checkStringNotEmpty(userInfo.getSurname())) {
            user.setSurname(userInfo.getSurname());
        }
        if (FieldUtil.checkStringNotEmpty(profilePic)) {
            user.setProfilePic(profilePic);
        }
    }
}
