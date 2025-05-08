package org.manazeak.manazeak.constant.notification.reference.country;

import org.manazeak.manazeak.constant.notification.NotificationMessage;
import org.manazeak.manazeak.constant.notification.NotificationMessageEnum;

/**
 * Contains the notification related to the country.
 */
public enum CountryNotificationEnum implements NotificationMessageEnum {
    COUNTRY_NOT_FOUND_ERROR(NotificationMessage.of("reference.country.error.not_found",
            "reference.country.error.not_found_title"));


    private final NotificationMessage message;


    CountryNotificationEnum(NotificationMessage message) {
        this.message = message;
    }

    /**
     * @return the information about tne notification messages.
     */
    @Override
    public NotificationMessage getNotificationMessage() {
        return message;
    }
}
