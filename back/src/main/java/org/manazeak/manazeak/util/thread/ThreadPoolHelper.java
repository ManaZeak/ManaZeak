package org.manazeak.manazeak.util.thread;

import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
public final class ThreadPoolHelper {

    private ThreadPoolHelper() {

    }

    /**
     * Wait for a thread pool executor to finish.
     *
     * @param executor The thread pool executor.
     */
    public static void waitPoolFinish(ExecutorService executor) {
        try {
            // Waiting for all the jobs to finish.
            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                log.error("The thread executor was terminated by the thread pool timeout.");
            }
        } catch (InterruptedException e) {
            log.warn("The integration thread interrupted.", e);
            Thread.currentThread().interrupt();
        }
    }

    /**
     * Wait for a thread pool executor to finish.
     *
     * @param executor The thread pool executor.
     * @param message  The error message to display.
     */
    public static void waitPoolFinish(ExecutorService executor, String message) {
        try {
            // Waiting for all the jobs to finish.
            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                log.error(message);
            }
        } catch (InterruptedException e) {
            log.warn("The integration thread interrupted.", e);
            Thread.currentThread().interrupt();
        }
    }

}
