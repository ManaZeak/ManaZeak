package org.manazeak.manazeak.service.message;

/**
 * Allows to manage the localisation of the messages of the application.
 */
public interface MessageManager {

    /**
     * Get a message from a message key.
     *
     * @param key the key of the message to get.
     * @return The message in the right language.
     */
    String getMessage(String key);

}
