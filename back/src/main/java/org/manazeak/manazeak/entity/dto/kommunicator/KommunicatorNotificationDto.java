package org.manazeak.manazeak.entity.dto.kommunicator;

import lombok.Data;

/**
 * Contains a notification with transcoded message codes and error message and severity.
 */
@Data
public class KommunicatorNotificationDto {

    private String title;
    private String message;
    private String type;

}
