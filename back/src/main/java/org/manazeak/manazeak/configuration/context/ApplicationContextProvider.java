package org.manazeak.manazeak.configuration.context;

import lombok.NonNull;
import org.manazeak.manazeak.util.commons.AppContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Automatically initialize the application context.
 */
@Component
public class ApplicationContextProvider implements ApplicationContextAware {

    /**
     * Set the application context into the static object.
     *
     * @param ctx The Spring context
     */
    @Override
    public void setApplicationContext(@NonNull ApplicationContext ctx) {
        AppContext.setApplicationContext(ctx);
    }

}