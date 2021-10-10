package org.manazeak.manazeak.exception;

import org.manazeak.manazeak.constant.notification.NotificationMessageEnum;

import java.util.function.Supplier;

/**
 * Helper to generate exception for ManaZeak.
 */
public final class MzkExceptionHelper {

    private static final String TITLE_OBJECT_NOT_FOUND = "general.error.object_not_found_title";

    private MzkExceptionHelper() {

    }

    /**
     * Creates a supplier of an exception with the given message.
     *
     * @param messageKey The key corresponding to the message.
     * @return The exception with the message and a title.
     */
    public static Supplier<MzkObjectNotFoundException> generateSupplierObjectNotFoundException(String messageKey) {
        return () -> generateObjectNotFoundException(messageKey);
    }

    /**
     * Generate an exception with the given message.
     *
     * @param messageKey The key corresponding to the message.
     * @return The exception with a message and a title.
     */
    public static MzkObjectNotFoundException generateObjectNotFoundException(String messageKey) {
        return new MzkObjectNotFoundException("The object hasn't been found", messageKey, TITLE_OBJECT_NOT_FOUND);
    }

    public static Supplier<MzkRuntimeException> generateMzkRuntimeException(String message,
                                                                            NotificationMessageEnum notification) {
        return () -> new MzkRuntimeException(message, notification);
    }

}
