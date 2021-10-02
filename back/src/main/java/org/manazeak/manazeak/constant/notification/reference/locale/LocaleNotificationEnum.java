package org.manazeak.manazeak.constant.notification.reference.locale;

import org.manazeak.manazeak.constant.notification.NotificationMessage;
import org.manazeak.manazeak.constant.notification.NotificationMessageEnum;

/**
 * Contains the notification related to the locale of the application.
 */
public enum LocaleNotificationEnum implements NotificationMessageEnum {
    LOCALE_NOT_FOUND_ERROR(NotificationMessage.of("user.locale.not_found", "user.locale.not_found_title"));

    private final NotificationMessage message;

    LocaleNotificationEnum(NotificationMessage message) {
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
