package org.manazeak.manazeak.manager.security.user.avatar;

import org.manazeak.manazeak.constant.notification.user.UserNotificationEnum;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.file.FileUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Handles the save action of the avatar of the user.
 */
@Component
public class UserProfilePicManager {

    /**
     * Getting the folder where the covers are stored.
     */
    private static final Path AVATAR_PATH = Paths.get("/resources/avatars/");

    /**
     * {@inheritDoc}
     *
     * @return The name of the file.
     */
    public String saveUserAvatarIntoResources(MultipartFile file, MzkUser user) {
        // There is no file to save.
        if (file == null || file.isEmpty()) {
            return null;
        }
        // Computing the filename.
        String fileName = user.getUsername() + FileUtil.getExtensionByMagicBytes(file).getExtension();
        // Checking if the folder exists and creating it.
        FileUtil.createDirectories(AVATAR_PATH);
        // The destination path.
        Path dest = AVATAR_PATH.resolve(fileName);
        // We copy the file into the resources folder.
        try (InputStream stream = file.getInputStream()) {
            Files.copy(stream, dest, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new MzkRuntimeException("The user avatar couldn't be written.",
                    UserNotificationEnum.USER_AVATAR_NOT_FOUND, e);
        }
        return fileName;
    }
}
