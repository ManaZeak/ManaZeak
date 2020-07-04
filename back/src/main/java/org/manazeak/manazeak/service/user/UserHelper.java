package org.manazeak.manazeak.service.user;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.util.DateUtil;

/**
 * Util class for operation on the users.
 */
public final class UserHelper {

    private UserHelper() {

    }

    /**
     * Create a {@link MzkUser} from a {@link NewUserDto} used in the insertion in DB.
     *
     * @param newUser the user that will be created.
     * @return The user that will be inserted in DB.
     */
    public static MzkUser loadMzkUserFromNewUser(NewUserDto newUser) {
        MzkUser user = new MzkUser();
        user.setUsername(newUser.getUsername());
        user.setBio(newUser.getBio());
        user.setLocale(newUser.getLocale());
        user.setBirthDate(DateUtil.parseString(newUser.getBirthDate(), DateUtil.FR_DATE_FORMATTER));
        // TODO: add country.
        user.setMail(newUser.getMail());
        user.setSurname(newUser.getSurname());
        user.setName(newUser.getName());
        return user;
    }
}
