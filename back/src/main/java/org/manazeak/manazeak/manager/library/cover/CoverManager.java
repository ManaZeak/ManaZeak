package org.manazeak.manazeak.manager.library.cover;

import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.thumb.ThumbnailUtil;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

/**
 * Allows to handle the covers of the albums of the library.
 */
@Component
public class CoverManager {

    /**
     * Launch the process that generate the thumbnail of the covers.
     *
     * @param coverPaths The list of the cover path.
     */
    public void launchCoverThumbnailGeneration(List<Path> coverPaths) {
        //
    }

    /**
     * Generate the thumb for the given cover path.
     */
    private void generateThumbForCover(Path cover) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            // Getting the name of the thumb for the location md5
            md5.update(cover.getParent().toString().getBytes(StandardCharsets.UTF_8));
            byte[] digest = md5.digest();
            String coverName = DatatypeConverter.printHexBinary(digest).toUpperCase();
            // TODO: generate the cover at the sizes.
            // ThumbnailUtil.generateThumbs();
        } catch (NoSuchAlgorithmException e) {
            throw new MzkRuntimeException("The md5 algorithm wasn't found.", e);
        }
    }

}
