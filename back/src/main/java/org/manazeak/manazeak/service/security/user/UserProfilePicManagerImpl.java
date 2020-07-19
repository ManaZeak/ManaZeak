package org.manazeak.manazeak.service.security.user;

import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.file.FileUtil;
import org.springframework.stereotype.Service;
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
@Service
public class UserProfilePicManagerImpl implements UserProfilePicManager {

    /**
     * Getting the folder where the covers are stored.
     */
    private static final Path AVATAR_PATH = Paths.get("/resources/avatars/");

    /**
     * {@inheritDoc}
     * @return
     */
    @Override
    public String saveUserAvatarIntoResources(MultipartFile file, MzkUser user) {
        // There is no file to save.
        if (file.isEmpty()) {
            return null;
        }
        // Computing the filename.
        String fileName = user.getUsername() + FileUtil.getExtensionByMagicBytes(file).getExtension();
        // Checking if the folder exists and creating it.
        FileUtil.createDirectories(AVATAR_PATH);
        // The destination path.
        Path dest = AVATAR_PATH.resolve(fileName);
        // We copy the file into the resources folder.
        try(InputStream stream = file.getInputStream()) {
            Files.copy(stream, dest, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new MzkRuntimeException("Impossible to save the avatar into the storage.", e);
        }
        return fileName;
    }
}
