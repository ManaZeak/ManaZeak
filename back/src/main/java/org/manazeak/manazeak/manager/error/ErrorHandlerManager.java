package org.manazeak.manazeak.manager.error;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.message.ErrorEnum;
import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.NotificationDto;
import org.manazeak.manazeak.exception.MzkRestException;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

/**
 * Handle the errors of the controllers.
 */
@Component
@RequiredArgsConstructor
public class ErrorHandlerManager {

    /**
     * {@inheritDoc}
     */
    public void handleValidationErrors(BindingResult result) {
        // Checking if there is some validation errors.
        if (!result.hasErrors()) {
            return;
        }
        generateRestErrorFromValidationError(result.getFieldErrors());
    }

    /**
     * {@inheritDoc}
     */
    public void generateRestErrorFromValidationError(Iterable<FieldError> errors) {
        // Generating the exception.
        MzkRestException exception = new MzkRestException();
        // Adding the errors to the exception.
        for (FieldError error : errors) {
            NotificationDto notification = new NotificationDto();
            notification.setTitleKey("general.error.validation_error");
            notification.setMessage(error.getDefaultMessage());
            notification.setSeverity(NotificationSeverityEnum.ERROR);
            exception.addNotification(notification);
        }
        throw exception;
    }

    /**
     * {@inheritDoc}
     */
    public void generateRestErrorFromErrorEnum(ErrorEnum... errors) {
        MzkRestException exception = new MzkRestException();
        // Adding the errors for the enum.
        for (ErrorEnum error : errors) {
            NotificationDto notification = new NotificationDto();
            notification.setTitleKey(error.getTitleKey());
            notification.setMessageKey(error.getMessageKey());
            notification.setSeverity(error.getSeverity());
            exception.addNotification(notification);
        }
        throw exception;
    }
}
