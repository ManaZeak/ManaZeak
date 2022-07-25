package org.manazeak.manazeak.exception;

/**
 * Exception generated when a tag read or write failed.
 */
public class MzkTagException extends Exception {


    /**
     * The message that will be saved in the database as an import error.
     */
    private final String messageKey;

    private final String filePath;

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param message    The message key that will be used to display the message to the user.
     * @param messageKey The message key that will be used to save the error into the database.
     * @param e          The cause of this exception.
     * @param filePath   The path of the file that couldn't be processed.
     */
    public MzkTagException(String message, String messageKey, String filePath, Throwable e) {
        super(message, e);
        this.messageKey = messageKey;
        this.filePath = filePath;
    }

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param message    The message key that will be used to display the message to the user.
     * @param messageKey The message key that will be used to store the error into the database.
     * @param filePath   The path of the file that couldn't be processed.
     */
    public MzkTagException(String message, String messageKey, String filePath) {
        super(message);
        this.messageKey = messageKey;
        this.filePath = filePath;
    }

    /**
     * Get the message key to store into the database.
     *
     * @return The message key.
     */
    public String getMessageKey() {
        return messageKey;
    }

    /**
     * Get the path of the file that coudn't be processed.
     *
     * @return The path of the file that couldn't be processed.
     */
    public String getFilePath() {
        return filePath;
    }
}
