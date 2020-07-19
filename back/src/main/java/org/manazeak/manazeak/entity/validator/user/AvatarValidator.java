package org.manazeak.manazeak.entity.validator.user;

import org.manazeak.manazeak.util.file.FormatFileCheckerUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * This class validate the avatar of a user.
 */
@Component
public class AvatarValidator implements ConstraintValidator<Avatar, MultipartFile> {

    /**
     * Checking if the file is an image or something else.
     *
     * @param file                       The file to check.
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
