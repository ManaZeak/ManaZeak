package org.manazeak.manazeak.datacreation.user;

import org.manazeak.manazeak.entity.dto.user.NewUserDto;
import org.springframework.stereotype.Component;

/**
 * This class is used to create a new user DTO with default values.
 */
@Component
public class NewUserDataCreation {

    /**
     * Creates a new user DTO with default values.
     * @return a new user DTO.
     */
    public NewUserDto createNewUserDto() {
        NewUserDto newUser = new NewUserDto();
        newUser.setUsername(UserTestConstants.USERNAME);
        newUser.setPassword1(UserTestConstants.PASSWORD);
        newUser.setPassword2(UserTestConstants.PASSWORD);
        newUser.setMail(UserTestConstants.MAIL);
        return newUser;
    }
}
