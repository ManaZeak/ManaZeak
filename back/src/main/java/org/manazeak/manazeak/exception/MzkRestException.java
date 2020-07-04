package org.manazeak.manazeak.exception;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * This exception is used by the errors in the WS controller.
 */
public class MzkRestException extends Exception {

    private final Set<String> messages = new HashSet<>();

    /**
     * Create an exception.
     */
    public MzkRestException() {
    }

    /**
     * Create an exception with only one message.
     *
     * @param message The message contained in the exception.
     */
    public MzkRestException(String message) {
        messages.add(message);
    }

    public Set<String> getMessages() {
        return messages;
    }

    /**
     * Add one message to the set of messages.
     *
     * @param message the exception message to add.
     */
    public void addMessage(String message) {
        messages.add(message);
    }

    /**
     * Add multiple message to the exception.
     *
     * @param messages the messages to add into the exception.
     */
    public void addMessages(List<String> messages) {
        this.messages.addAll(messages);
    }
}
