package org.manazeak.manazeak.constant.notification.file;

import org.manazeak.manazeak.constant.notification.NotificationMessage;
import org.manazeak.manazeak.constant.notification.NotificationMessageEnum;
import org.manazeak.manazeak.constant.notification.NotificationTypeEnum;

/**
 * Contains the different notification possible for the file notification.
 */
public enum FileNotificationEnum implements NotificationMessageEnum {
    PARENT_DIRECTORY_CREATION_ERROR(NotificationMessage.of("general.error.file.parent_directory",
            "general.error.file.parent_directory_title")),
    BAD_FORMAT_ERROR(NotificationMessage.of("general.error.file.bad_format",
            "general.error.file.bad_format_title")),
    /**
     * Error when reading a file.
     */
    IO_ERROR(NotificationMessage.of("error.file_system.io_error", "error.file_system.io_error_title",
            NotificationTypeEnum.ERROR)),
    /**
     * A type of file wasn't handled by the application.
     */
    MIME_TYPE_NOT_FOUND_ERROR(NotificationMessage.of("general.error.file.mime_type_error",
            "general.error.file.mime_type_error_title", NotificationTypeEnum.ERROR));


    private final NotificationMessage message;

    FileNotificationEnum(NotificationMessage message) {
        this.message = message;
    }

    /**
     * @return the information about tne notification messages.
     */
    @Override
    public NotificationMessage getNotificationMessages() {
        return message;
    }
}
