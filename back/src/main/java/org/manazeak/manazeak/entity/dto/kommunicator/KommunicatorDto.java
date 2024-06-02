package org.manazeak.manazeak.entity.dto.kommunicator;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Object used to communicate with the front.
 */
@Data
@AllArgsConstructor
public class KommunicatorDto implements Serializable {

    private final boolean done;
    private final List<KommunicatorNotificationDto> notifications = new ArrayList<>();

    public KommunicatorDto() {
        done = true;
    }

    /**
     * Add a list of errors to the object.
     *
     * @param errors the errors messages.
     */
    public void addNotifications(List<KommunicatorNotificationDto> errors) {
        this.notifications.addAll(errors);
    }

    /**
     * Add one error to the object.
     *
     * @param error the error message.
     */
    public void addNotification(KommunicatorNotificationDto error) {
        this.notifications.add(error);
    }
}
