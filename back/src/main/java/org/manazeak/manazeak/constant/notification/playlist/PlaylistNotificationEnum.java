package org.manazeak.manazeak.constant.notification.playlist;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.notification.NotificationMessage;
import org.manazeak.manazeak.constant.notification.NotificationMessageEnum;

/**
 * Enum representing the various notifications related to playlists.
 * Each enum value corresponds to a specific notification message object
 * which includes localized message keys and a default notification type.
 */
@RequiredArgsConstructor
@Getter
public enum PlaylistNotificationEnum implements NotificationMessageEnum {

    PLAYLIST_NOT_FOUND_ERROR(NotificationMessage.of("playlist.error.not_found", "playlist.error.not_found_title")),
    PLAYLIST_TRACK_NOT_FOUND_ERROR(NotificationMessage.of("playlist.error.track_not_found", "playlist.error.track_not_found_title"));

    private final NotificationMessage notificationMessage;

}
