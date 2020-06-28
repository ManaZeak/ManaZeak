package org.manazeak.manazeak.service.error;

import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

import java.util.Locale;

/**
 * Handle the errors of the controllers.
 */
public interface ErrorHandlerService {

    /**
     * Get the communicator object from the errors of the validation.
     * @param errors the errors of the validator.
     * @param locale The locale of the user to translate the message correctly.
     * @return the communicator object.
     */
    KommunicatorObject createKommunicatorObjectFromError(Iterable<FieldError> errors, Locale locale);
}
