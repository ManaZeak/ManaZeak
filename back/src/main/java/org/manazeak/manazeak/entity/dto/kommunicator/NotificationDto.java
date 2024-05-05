package org.manazeak.manazeak.entity.dto.kommunicator;

import lombok.Data;
import org.manazeak.manazeak.constant.notification.NotificationTypeEnum;

/**
 * Contains the information to build a notification with error codes.
 */
@Data
public class NotificationDto {

    /**
     * Contains the title key of the error.
     */
    private String titleKey;
    /**
     * Contains the message key of the error.
     */
    private String messageKey;
    /**
     * The message if the key wasn't available
     */
    private String message;
    /**
     * The severity of the notification.
     */
    private NotificationTypeEnum type;

    public boolean hasMessage() {
        return message != null;
    }
}
