package org.manazeak.manazeak.dto.user;

import org.manazeak.manazeak.dto.DtObject;
import org.springframework.context.annotation.Bean;

import java.io.Serializable;

/**
 * Object containing the information to give to the front.
 */
public class LightUserDto extends DtObject {

    public LightUserDto(){
        this.userId=1L;
        this.username="cock";
    }

    /**
     * The id of the user.
     */
    private Long userId;
    /**
     * The username of the user.
     */
    private String username;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
