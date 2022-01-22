package org.manazeak.manazeak.util.commons;

import org.springframework.context.ApplicationContext;

/**
 * An class to access the application context in a static way.
 */
public final class AppContext {

    /**
     * Application context
     */
    private static ApplicationContext ctx;

    private AppContext() {
        // constructeur privé
    }

    /**
     * Retourne l'application context
     *
     * @return l'application context
     */
    public static ApplicationContext getApplicationContext() {
        return ctx;
    }

    /**
     * Met à jour l'application context
     *
     * @param applicationContext l'application context
     */
    public static void setApplicationContext(final ApplicationContext applicationContext) {
        ctx = applicationContext;
    }

    /**
     * Get the bean of the specified type.
     * @param clazz The class of the bean.
     * @param <T> The type of the bean.
     * @return The bean.
     */
    public static <T> T getBean(final Class<T> clazz) {
        return ctx.getBean(clazz);
    }

}
