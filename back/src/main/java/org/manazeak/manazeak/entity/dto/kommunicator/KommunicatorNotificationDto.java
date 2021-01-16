package org.manazeak.manazeak.entity.dto.kommunicator;

/**
 * Contains a notification with transcoded message codes and error message and severity.
 */
public class KommunicatorNotificationDto {

    private String title;
    private String message;
    private String severity;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}
