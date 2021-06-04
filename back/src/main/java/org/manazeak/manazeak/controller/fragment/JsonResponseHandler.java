package org.manazeak.manazeak.controller.fragment;

import org.manazeak.manazeak.controller.page.response.ResponseFragmentEnum;
import org.manazeak.manazeak.service.message.MessageManager;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

/**
 * Prepare some JSON to be send as a response to a user.
 */
@Component
public class JsonResponseHandler {

    private final MessageManager messageManager;

    public JsonResponseHandler(MessageManager messageManager) {
        this.messageManager = messageManager;
    }

    /**
     * Prepare a JSON response for the front as a success.
     * @param titleCode The code of the title that will be sent to the user.
     * @param messageCode The content of the message that will be sent to the user.
     * @param model The 
     * @return The JSON response message.
     */
    public String prepareJsonSuccess(final String titleCode, final String messageCode, Model model) {
        // Adding the information for the JSON return
        model.addAttribute("title", messageManager.getMessage(titleCode));
        model.addAttribute("message", messageManager.getMessage(messageCode));
        // Returns a JSON with the status.
        return ResponseFragmentEnum.SUCCESS_RESPONSE.getPage();
    }

}
