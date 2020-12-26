package org.manazeak.manazeak.service.message;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

/**
 * Handle the message resolution in the services and in the managers.
 */
@Service
public class MessageManager {

    private final MessageSource messageSource;

    public MessageManager(final MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * Get a message from a message key.
     *
     * @param key the key of the message to get.
     * @return The message in the right language.
     */
    public String getMessage(String key) {
        return messageSource.getMessage(key, null, LocaleContextHolder.getLocale());
    }

    /**
     * Get a message from a validation error.
     *
     * @param error The validation error.
     * @return The message in the connected user language.
     */
    public String getMessage(FieldError error) {
        return messageSource.getMessage(error, LocaleContextHolder.getLocale());
    }
}
