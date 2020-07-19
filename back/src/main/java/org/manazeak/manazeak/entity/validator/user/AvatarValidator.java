package org.manazeak.manazeak.entity.validator.user;

import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.service.security.user.UserService;
import org.manazeak.manazeak.util.file.FormatFileCheckerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.io.IOException;
import java.io.InputStream;

/**
 * This class validate the avatar of a user.
 */
@Component
public class AvatarValidator implements ConstraintValidator<Avatar, MultipartFile> {

    private final UserService userService;

    private static final Logger LOG = LoggerFactory.getLogger(AvatarValidator.class);

    public AvatarValidator(UserService userService) {
        this.userService = userService;
    }

    /**
     * Checking if the file is an image or something else.
     * @param file The file to check.
     * @param constraintValidatorContext validation parameter.
     * @return true is valid false otherwise.
     */
    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext constraintValidatorContext) {
        // If the file is empty, the image is safe.
        if (file.isEmpty()) {
            return true;
        }
        // If there is something in the file we check that's an image.
        return FormatFileCheckerUtil.isValidImage(file);
    }
}
