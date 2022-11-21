package org.manazeak.manazeak.entity.dto.user;


import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;
import lombok.RequiredArgsConstructor;


/**
 * Used to store the information
 */
@Data
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class ResetUserPasswordDto {

    private final String password;
    private final Long userId;

    public String getPassword() {
        return password;
    }

    public Long getUserId() {
        return userId;
    }
}
