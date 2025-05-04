package org.manazeak.manazeak.util;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.exception.MzkRuntimeException;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
public final class ThreadUtils {

    private ThreadUtils() {
    }

    /**
     * Wait for the executor to finish all thread contained.
     *
     * @param executor The executor service to wait.
     */
    public static void awaitExecutorTermination(@NonNull final ExecutorService executor, @NonNull String taskName) {
        // Checking if the executor is terminated.
        if (!executor.isShutdown()) {
            log.error("The executor must be terminated, otherwise this method will forever.");
            throw new MzkRuntimeException("Executor is not terminated");
        }

        // Waiting for the threads to finish.
        try {
            if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                throw new MzkRuntimeException("The timeout for the " + taskName);
            }
        } catch (InterruptedException e) {
            log.error("Thread interrupted during the {}.", taskName, e);
            Thread.currentThread().interrupt();
        }
    }

}
