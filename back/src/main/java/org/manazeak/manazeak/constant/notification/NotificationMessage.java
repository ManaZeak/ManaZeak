package org.manazeak.manazeak.constant.notification;

import lombok.Getter;

import java.io.Serializable;

/**
 * Contains the messages used to build the notification.
 */
@Getter
public final class NotificationMessage implements Serializable {

    private final String messageKey;

    private final String titleKey;

    private final NotificationTypeEnum type;

    /**
     * Build an instance of the notification message.
     *
     * @param messageKey The i18n key of the message.
     * @param titleKey   The i18n key of the title.
     * @param type   The severity of the notification in the front.
     */
    private NotificationMessage(String messageKey, String titleKey, NotificationTypeEnum type) {
        this.messageKey = messageKey;
        this.titleKey = titleKey;
        this.type = type;
    }

    public static NotificationMessage of(String messageKey, String titleKey, NotificationTypeEnum type) {
        return new NotificationMessage(messageKey, titleKey, type);
    }

    public static NotificationMessage of(String messageKey, String titleKey) {
        return new NotificationMessage(messageKey, titleKey, NotificationTypeEnum.ERROR);
    }

}
