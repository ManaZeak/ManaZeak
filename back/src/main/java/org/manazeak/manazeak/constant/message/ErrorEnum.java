package org.manazeak.manazeak.constant.message;

import lombok.Getter;
import org.manazeak.manazeak.constant.notification.NotificationTypeEnum;

/**
 * This enum contains the possible errors of the application.
 */
@Getter
public enum ErrorEnum {

    /**
     * The asked user desn't exists in the database.
     */
    USER_NOT_FOUND("general.error.validation_error", "database.error.user_not_found", NotificationTypeEnum.ERROR);

    private final String messageKey;

    private final String titleKey;

    private final NotificationTypeEnum type;

    ErrorEnum(String titleKey, String messageKey, NotificationTypeEnum type) {
        this.titleKey = titleKey;
        this.messageKey = messageKey;
        this.type = type;
    }

}
