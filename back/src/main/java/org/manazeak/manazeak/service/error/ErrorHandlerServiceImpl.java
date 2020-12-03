package org.manazeak.manazeak.service.error;

import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.constant.error.ErrorEnum;
import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.NotificationDto;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.service.message.MessageManager;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

/**
 * Handle the errors of the controllers.
 */
@Service
@TransactionnalWithRollback
public class ErrorHandlerServiceImpl implements ErrorHandlerService {

    /**
     * The object for getting internationalized messages.
     */
    private final MessageManager messageManager;

    public ErrorHandlerServiceImpl(MessageManager messageManager) {
        this.messageManager = messageManager;
    }

    /**
     * {@inheritDoc}
     */
    @Override
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
    @Override
    public void generateRestErrorFromValidationError(Iterable<FieldError> errors) throws MzkRestException {
        // Generating the exception.
        MzkRestException exception = new MzkRestException();
        // Adding the errors to the exception.
        for (FieldError error : errors) {
            NotificationDto notification = new NotificationDto();
            notification.setTitleKey("general.error.validation_error");
            notification.setMessageKey(error.getCode());
            notification.setSeverity(NotificationSeverityEnum.ERROR);
            exception.addNotification(notification);
        }
        throw exception;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void generateRestErrorFromErrorEnum(ErrorEnum... errors) throws MzkRestException {
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
