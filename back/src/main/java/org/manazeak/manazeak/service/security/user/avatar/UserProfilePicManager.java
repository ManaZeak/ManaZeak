package org.manazeak.manazeak.service.security.user.avatar;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.web.multipart.MultipartFile;

/**
 * Used to manage the profile pic of a user.
 */
public interface UserProfilePicManager {

    /**
     * Save the avatar of a user into the FS. Replace the old avatar if any.
     *
     * @param file The file in the form given by the user.
     * @param user The user changing it's picture.
     * @return true if an image has been saved.
     */
    String saveUserAvatarIntoResources(MultipartFile file, MzkUser user);
}
