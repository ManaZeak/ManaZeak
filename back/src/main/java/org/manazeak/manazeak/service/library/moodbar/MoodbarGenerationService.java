package org.manazeak.manazeak.service.library.moodbar;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;
import org.manazeak.manazeak.constant.library.moodbar.MoodbarSizeEnum;
import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;
import org.manazeak.manazeak.daos.library.management.mood.MoodbarGeneratorDAO;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.dto.library.moodbar.MoodbarGenerationProjection;
import org.manazeak.manazeak.entity.dto.library.moodbar.MoodbarGenerationReport;
import org.manazeak.manazeak.entity.dto.library.moodbar.MoodbarImageGenerationProjection;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.moodbar.MoodbarManager;
import org.manazeak.manazeak.manager.library.status.LibraryScanStatusManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * This service allows generating moodbars in the application via the moodbar container.
 */
@Service
@Slf4j
@RequiredArgsConstructor
@TransactionalWithRollback
public class MoodbarGenerationService {

    private static final int BUFFER_SIZE = 200;
    private final AtomicBoolean isRunning = new AtomicBoolean(false);
    private final TrackDAO trackDAO;
    private final MoodbarManager moodbarManager;
    private final MoodbarGeneratorDAO moodbarGeneratorDAO;
    private final LibraryScanStatusManager libraryScanStatusManager;

    /**
     * Launching the moodbar generation if not running already.
     */
    public void checkMoodbarLaunchCondition() {
        // Checking if the moodbar generation isn't running.
        if (isRunning.get()) {
            throw new MzkRestException("admin.library.moodbar.gen.fail.message",
                    "admin.library.moodbar.gen.fail.mood.message", NotificationSeverityEnum.WARNING);
        }

        try {
            libraryScanStatusManager.checkNoActiveScan();
        } catch (MzkRuntimeException e) {
            throw new MzkRestException("admin.library.moodbar.gen.fail.message",
                    "admin.library.moodbar.gen.fail.scanning.message", NotificationSeverityEnum.WARNING);
        }
    }

    /**
     * Delete all the moodbar images and launch the generation of the images.
     */
    @Async
    public void launchMoodbarImageRegenThread() {
        try {
            log.info("Launching the moodbar image regeneration.");
            isRunning.set(true);
            // Deleting all the images of the moodbars.
            FileSystemUtils.deleteRecursively(ResourcePathEnum.MOOD_FOLDER.getPath());

            // Creating the thread pool.
            try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
                Long lastTrackId = 0L;
                while (true) {
                    // Building a pageable for the SQL request.
                    Pageable pageable = PageRequest.of(0, BUFFER_SIZE);

                    // Getting a packet of elements.
                    List<MoodbarImageGenerationProjection> elements = trackDAO.getAllMoodbars(lastTrackId, pageable);

                    // If the list is empty, then exiting the loop.
                    if (elements.isEmpty()) {
                        break;
                    }

                    // Adding the job to the thread pool.
                    executor.submit(processMoodFileToPicture(elements));

                    // Getting the last element of the list.
                    lastTrackId = elements.get(elements.size() - 1).getId();
                }

                executor.shutdown();

                try {
                    if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                        throw new MzkRuntimeException("The timeout for the moodbar gen.");
                    }
                } catch (InterruptedException e) {
                    log.error("Thread interrupted during the moodbar gen.", e);
                    Thread.currentThread().interrupt();
                }
            }
        } catch (IOException e) {
            throw new MzkRuntimeException("Error when processing files during moodbar image regeneration.", e);
        } finally {
            // The job isn't running anymore.
            isRunning.set(false);
            log.info("Moodbar image regeneration has ended.");
        }
    }

    /**
     * Launch the moodbar generation thread pool.
     */
    @Async
    public void launchMoodbarGenThread() {
        try {
            log.info("Launching moodbar generation.");
            isRunning.set(true);
            // Creating the thread pool.
            ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

            Long lastTrackId = 0L;
            while (true) {
                // Building a pageable for the SQL request.
                Pageable pageable = PageRequest.of(0, BUFFER_SIZE);

                // Getting a packet of elements.
                List<MoodbarGenerationProjection> elements = trackDAO.getTracksWithoutMoodbar(lastTrackId, pageable);

                // If the list is empty, then exiting the loop.
                if (elements.isEmpty()) {
                    break;
                }

                // Adding the job to the thread pool.
                executor.submit(processTracksPacket(elements));

                // Getting the last element of the list.
                lastTrackId = elements.get(elements.size() - 1).getId();
            }

            executor.shutdown();

            try {
                if (!executor.awaitTermination(Long.MAX_VALUE, TimeUnit.SECONDS)) {
                    throw new MzkRuntimeException("The timeout for the moodbar gen.");
                }
            } catch (InterruptedException e) {
                log.error("Thread interrupted during the moodbar gen.", e);
                Thread.currentThread().interrupt();
            }
        } finally {
            // The job isn't running anymore.
            isRunning.set(false);
            log.info("Moodbar generation has ended.");
        }
    }

    /**
     * Launch the generation of moodbars for a list of tracks.
     *
     * @param tracks The tracks without moodbar to generate.
     * @return The task to run in the thread pool.
     */
    private Runnable processTracksPacket(List<MoodbarGenerationProjection> tracks) {
        return () -> {
            try {
                List<Pair<Long, String>> moodbarsToUpdate = new ArrayList<>();
                for (MoodbarGenerationProjection track : tracks) {
                    MoodbarGenerationReport report = moodbarManager.launchMoodbarGeneration(track);
                    Pair<Long, String> moodbar = Pair.of(report.getTrackId(), report.getMoodMd5() + FileExtensionEnum.WEBP.getExtension());
                    if (!report.isError()) {
                        moodbarsToUpdate.add(moodbar);
                    }
                }

                moodbarGeneratorDAO.insertMoodbars(moodbarsToUpdate);
            } catch (Exception e) {
                log.error("An error occurred during the moodbar generation.", e);
            }
        };
    }

    private Runnable processMoodFileToPicture(List<MoodbarImageGenerationProjection> moodbars) {
        return () -> {
            for (MoodbarImageGenerationProjection moodbar : moodbars) {
                String moodbarMd5 = moodbar.getMoodbar()
                        .substring(0, moodbar.getMoodbar().length() - FileExtensionEnum.WEBP.getExtension().length());
                // Generating a moodbar for each size.
                for (MoodbarSizeEnum size : MoodbarSizeEnum.values()) {
                    Path moodbarFile = ResourcePathEnum.MOOD_ENCODED_FOLDER.getPath()
                            .resolve(size.getFolderName())
                            .resolve( moodbarMd5 + FileExtensionEnum.MOOD.getExtension());

                    try {
                        moodbarManager.launchMoodbarImageGen(moodbarFile, moodbarMd5, size);
                    } catch (IOException e) {
                        log.error("Error when generating the moodbar image for this moodbar : " + moodbar, e);
                    }
                }
            }
        };
    }
}
