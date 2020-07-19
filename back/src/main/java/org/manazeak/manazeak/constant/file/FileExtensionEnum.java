package org.manazeak.manazeak.constant.file;

import org.manazeak.manazeak.exception.MzkRuntimeException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Contains the different file extensions.
 */
public enum FileExtensionEnum {
    JGP(".jpg", "image/jpeg", "image/jpg"),
    PNG(".png", "image/png");

    private final String extension;

    private final List<String> contentTypes;

    FileExtensionEnum(String extension, String... contentTypes) {
        this.extension = extension;
        this.contentTypes = new ArrayList<>();
        this.contentTypes.addAll(Arrays.asList(contentTypes));
    }

    public String getExtension() {
        return extension;
    }

    public List<String> getContentTypes() {
        return contentTypes;
    }

    public static FileExtensionEnum getFileExtensionByMimeType(String mimeType) {
        for (FileExtensionEnum extension : FileExtensionEnum.values()) {
            if(extension.getContentTypes().contains(mimeType)) {
                return extension;
            }
        }
        // Nothing was found
        throw new MzkRuntimeException("This mime type is not supported.");
    }
}
