package org.manazeak.manazeak.constant.notification.user;

import org.manazeak.manazeak.constant.notification.NotificationMessage;
import org.manazeak.manazeak.constant.notification.NotificationMessageEnum;

/**
 * Contains the notification related to the user edition.
 */
public enum UserNotificationEnum implements NotificationMessageEnum {
    USER_AVATAR_NOT_FOUND(NotificationMessage.of("error.file_system.avatar", "error.file_system.avatar_title")),
    USER_NOT_CONNECTED(NotificationMessage.of("error.user.not_connected", "error.user.not_connected_title")),
    DISABLED_USER_ERROR(NotificationMessage.of("user.error.disabled_user", "user.error.disabled_user")),
    USER_AUTH_ERROR(NotificationMessage.of("user.error.authentication_error", "user.error.authentication_error")),
    NO_USERNAME_ERROR(NotificationMessage.of("user.error.no_username", "user.error.no_username")),
    USER_NOT_FOUND_ERROR(NotificationMessage.of("user.error.not_found", "user.error.not_found_title")),
    INVITE_CODE_NOT_FOUND(NotificationMessage.of("user.invite_code.error.not_found",
            "user.invite_code.error.not_found_title")),
    ERROR_DELETING_ADMIN(NotificationMessage.of("user.error.delete_parent",
            "user.error.lock_out_protection_title"));

    private final NotificationMessage messages;

    UserNotificationEnum(NotificationMessage messages) {
        this.messages = messages;
    }

    /**
     * @return the information about tne notification messages.
     */
    @Override
    public NotificationMessage getNotificationMessage() {
        return messages;
    }
}
