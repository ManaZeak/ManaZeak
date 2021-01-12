package org.manazeak.manazeak.controller.html.fragment;

import org.manazeak.manazeak.exception.MzkObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Handles automatically the exceptions of the controllers.
 */
@ControllerAdvice(assignableTypes = FragmentController.class)
public class FragmentErrorAdvice {

    private static final Logger LOG = LoggerFactory.getLogger(FragmentErrorAdvice.class);

    @ExceptionHandler(MzkObjectNotFoundException.class)  //handle this exception
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleNotFoundException(final MzkObjectNotFoundException e, final Model model) {
        LOG.error("Object not found in the database.", e);
        model.addAttribute("title", e.getTitleKey());
        model.addAttribute("message", e.getMessageKey());
        return "error";
    }


}
