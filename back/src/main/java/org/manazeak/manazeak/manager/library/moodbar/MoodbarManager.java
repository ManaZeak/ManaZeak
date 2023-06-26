package org.manazeak.manazeak.manager.library.moodbar;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sksamuel.scrimage.ImmutableImage;
import com.sksamuel.scrimage.pixels.Pixel;
import com.sksamuel.scrimage.webp.WebpWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.file.FileExtensionEnum;
import org.manazeak.manazeak.constant.library.moodbar.MoodbarSizeEnum;
import org.manazeak.manazeak.daos.management.MoodbarErrorDAO;
import org.manazeak.manazeak.entity.dto.library.moodbar.MoodbarGenerationDto;
import org.manazeak.manazeak.entity.dto.library.moodbar.MoodbarGenerationProjection;
import org.manazeak.manazeak.entity.dto.library.moodbar.MoodbarGenerationReport;
import org.manazeak.manazeak.entity.management.MoodbarError;
import org.manazeak.manazeak.util.HashUtil;
import org.manazeak.manazeak.util.database.transaction.AutonomousTransactionManager;
import org.springframework.stereotype.Component;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.manazeak.manazeak.constant.file.ResourcePathEnum.MOOD_ENCODED_FOLDER;
import static org.manazeak.manazeak.constant.file.ResourcePathEnum.MOOD_FOLDER;

/**
 * Allows moodbar manipulation in the application.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class MoodbarManager {

    private static final URI MOODBAR_CONTAINER_ENDPOINT = URI.create("http://moodbar:4545/generate_mood");
    private static final int SUCCESS = 200;
    private final ObjectMapper objectMapper;
    private final HttpClient client = HttpClient.newHttpClient();
    private final MoodbarErrorDAO moodbarErrorDAO;
    private final AutonomousTransactionManager transactionManager;

    /**
     * Create the file that will contain the moodbar image.
     *
     * @param moodMd5 The md5 used for the moodbar.
     * @param size    The size of the moodbar generated.
     * @return The path were the file has been created.
     */
    private static Path createMoodbarImageDestination(String moodMd5, MoodbarSizeEnum size) throws IOException {
        Path moodImgPath = MOOD_FOLDER.getPath().resolve(size.getFolderName()).resolve(moodMd5 + FileExtensionEnum.WEBP.getExtension());
        Files.createDirectories(moodImgPath.getParent());
        if (!Files.exists(moodImgPath)) {
            Files.createFile(moodImgPath);
        }

        return moodImgPath;
    }

    private static Path getMoodbarDestination(String moodMd5, String sizeFolder) throws IOException {
        Path destination = MOOD_ENCODED_FOLDER.getPath()
                .resolve(sizeFolder)
                .resolve(moodMd5 + FileExtensionEnum.MOOD.getExtension());

        // Create the folder if it doesn't exist.
        Files.createDirectories(destination.getParent());

        return destination;
    }

    /**
     * Call the moodbar container to launch a moodbar generation.
     *
     * @param trackInfo The information about the track to be processed.
     */
    public MoodbarGenerationReport launchMoodbarGeneration(MoodbarGenerationProjection trackInfo) throws IOException {
        MoodbarGenerationReport report = new MoodbarGenerationReport();
        report.setMoodMd5(HashUtil.getMd5HashLower(trackInfo.getTrackPath()));
        report.setTrackId(trackInfo.getId());
        // The moodbars are generated at 3 sizes.
        for (MoodbarSizeEnum size : MoodbarSizeEnum.values()) {
            // Building the body of the request.
            Path moodbarDestination = getMoodbarDestination(report.getMoodMd5(), size.getFolderName());
            MoodbarGenerationDto genInfo = new MoodbarGenerationDto(trackInfo.getTrackPath(), moodbarDestination.toString(), String.valueOf(size.getSize()));
            // Building a request to send to the moodbar container.
            try {
                HttpRequest request = HttpRequest.newBuilder(MOODBAR_CONTAINER_ENDPOINT)
                        .header("accept", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(genInfo)))
                        .build();

                // Sending the request.
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                // Handling the error with the HTTP code.
                if (response.statusCode() != SUCCESS && !report.isError()) {
                    MoodbarError error = new MoodbarError();
                    error.setError(response.body());
                    error.setMoodErrorId(trackInfo.getId());

                    transactionManager.runInTransaction(() -> moodbarErrorDAO.save(error));
                    report.setError(true);
                    continue;
                }

                // Launching the generation of the webp file from the mood file.
                launchMoodbarImageGen(moodbarDestination, report.getMoodMd5(), size);
            } catch (JsonProcessingException e) {
                log.error("Error converting the payload to JSON.", e);
            } catch (IOException e) {
                log.error("Error when communicating with the moodbar container.", e);
            } catch (InterruptedException e) {
                log.error("The thread has been interrupted.", e);
                Thread.currentThread().interrupt();
            }
        }

        return report;
    }

    /**
     * Launch the generation of a webp file with the information read from the file generated by the moodbar container.
     *
     * @param moodbarGeneratedFile The file generated by the moodbar container.
     * @param moodMd5              The md generated for this moodbar.
     * @param size                 The size of the requested moodbar.
     * @throws IOException Error while generating the moodbar.
     */
    private void launchMoodbarImageGen(Path moodbarGeneratedFile, String moodMd5, MoodbarSizeEnum size) throws IOException {
        // Checking if the file exists.
        if (!Files.exists(moodbarGeneratedFile)) {
            log.error("No file where present for moodbar generation : {}", moodbarGeneratedFile);
            return;
        }

        // Reading the file and creating the output file.
        ImmutableImage image = ImmutableImage.create(size.getSize(), 1, BufferedImage.TYPE_INT_RGB);
        byte[] moodbarSource = Files.readAllBytes(moodbarGeneratedFile);
        // Preparing to read the moodbar file.
        for (int i = 0; i < size.getSize() * 3; i += 3) {
            Pixel pixel = new Pixel(
                    i / 3,
                    0,
                    Byte.toUnsignedInt(moodbarSource[i]),
                    Byte.toUnsignedInt(moodbarSource[i + 1]),
                    Byte.toUnsignedInt(moodbarSource[i + 2]),
                    0
            );
            image.setPixel(pixel);
        }
        // Writing the image to the FS.
        Path moodFile = createMoodbarImageDestination(moodMd5, size);
        image.output(WebpWriter.DEFAULT.withQ(80).withM(6), moodFile);
    }

}
