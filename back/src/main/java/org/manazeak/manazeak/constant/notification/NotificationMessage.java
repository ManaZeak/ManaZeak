package org.manazeak.manazeak.constant.notification;

import java.io.Serializable;

/**
 * Contains the messages used to build the notification.
 */
public final class NotificationMessage implements Serializable {

    private final String messageKey;

    private final String titleKey;

    private final NotificationSeverityEnum severity;

    /**
     * Build an instance of the notification message.
     *
     * @param messageKey The i18n key of the message.
     * @param titleKey   The i18n key of the title.
     * @param severity   The severity of the notification in the front.
     */
    private NotificationMessage(String messageKey, String titleKey, NotificationSeverityEnum severity) {
        this.messageKey = messageKey;
        this.titleKey = titleKey;
        this.severity = severity;
    }

    public static NotificationMessage of(String messageKey, String titleKey, NotificationSeverityEnum severity) {
        return new NotificationMessage(messageKey, titleKey, severity);
    }

    public static NotificationMessage of(String messageKey, String titleKey) {
        return new NotificationMessage(messageKey, titleKey, NotificationSeverityEnum.ERROR);
    }

    /**
     * @return The key of the message in the i18n file
     */
    public String getMessageKey() {
        return messageKey;
    }

    /**
     * @return The key of the title of the notification in the i18n file.
     */
    public String getTitleKey() {
        return titleKey;
    }

    /**
     * @return The severity of the notification.
     */
    public NotificationSeverityEnum getSeverity() {
        return severity;
    }

}
