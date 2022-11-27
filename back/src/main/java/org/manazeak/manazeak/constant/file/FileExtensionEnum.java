package org.manazeak.manazeak.constant.file;

import org.manazeak.manazeak.constant.notification.file.FileNotificationEnum;
import org.manazeak.manazeak.exception.MzkRuntimeException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Contains the different file extensions.
 */
public enum FileExtensionEnum {
    JGP(".jpg", "image/jpeg", "image/jpg"),
    PNG(".png", "image/png"),
    MP3(".mp3", "audio/mpeg", "audio/mp3"),
    FLAC(".flac", "audio/flac"),
    WEBP(".webp", "image/webp");

    private final String extension;

    private final String extensionWithoutDot;

    private final List<String> contentTypes;

    FileExtensionEnum(String extension, String... contentTypes) {
        this.extension = extension;
        this.extensionWithoutDot = extension.substring(1);
        this.contentTypes = new ArrayList<>();
        this.contentTypes.addAll(Arrays.asList(contentTypes));
    }

    public static FileExtensionEnum getFileExtensionByMimeType(String mimeType) {
        for (FileExtensionEnum extension : FileExtensionEnum.values()) {
            if (extension.getContentTypes().contains(mimeType)) {
                return extension;
            }
        }
        // Nothing was found
        throw new MzkRuntimeException("The mime type of the file :" + mimeType + "wasn't found",
                FileNotificationEnum.MIME_TYPE_NOT_FOUND_ERROR);
    }

    public String getExtension() {
        return extension;
    }

    public String getExtensionWithoutDot() {
        return extensionWithoutDot;
    }

    public List<String> getContentTypes() {
        return contentTypes;
    }
}
