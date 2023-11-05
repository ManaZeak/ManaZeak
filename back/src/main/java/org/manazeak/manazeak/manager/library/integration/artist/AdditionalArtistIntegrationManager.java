package org.manazeak.manazeak.manager.library.integration.artist;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.constant.file.AssetPathEnum;
import org.manazeak.manazeak.daos.library.integration.artist.ArtistAdditionalInfoLinkerDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ParsedArtistAdditionalInfoDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.alias.AliasManager;
import org.manazeak.manazeak.manager.library.artist.ArtistManager;
import org.manazeak.manazeak.manager.library.country.CountryManager;
import org.manazeak.manazeak.manager.library.integration.alias.AliasIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.bio.BioIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.interval.TimeIntervalIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.link.LinkIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.testimony.ArtistTestimonyIntegrationManager;
import org.manazeak.manazeak.manager.library.interval.TimeIntervalManager;
import org.manazeak.manazeak.util.thread.ThreadPoolHelper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdditionalArtistIntegrationManager {

    private static final int BUFFER_SIZE = 100;

    private final ObjectMapper objectMapper;

    private final LinkIntegrationManager linkIntegrationManager;

    private final CountryManager countryManager;

    private final AliasManager aliasManager;
    private final AliasIntegrationManager aliasIntegrationManager;

    private final TimeIntervalManager timeIntervalManager;
    private final TimeIntervalIntegrationManager timeIntervalIntegrationManager;

    private final ArtistManager artistManager;
    private final ArtistIntegrationManager artistIntegrationManager;
    private final ArtistAdditionalInfoLinkerDAO artistAdditionalInfoLinkerDAO;

    private final ArtistTestimonyIntegrationManager testimonyIntegrationManager;
    private final BioIntegrationManager bioIntegrationManager;


    /**
     * Launch the integration of the artist additional information.
     */
    public void integrateAdditionalArtistInfo() {
        // Listing all the json files on the file system.
        List<Path> files = new ArrayList<>();
        // Getting the folder containing the artists JSON.
        try (Stream<Path> fileStream = Files.walk(AssetPathEnum.ARTIST_ADDITIONAL_INFO_FOLDER.getFolder(), 1)) {
            for (Iterator<Path> it = fileStream.iterator(); it.hasNext(); ) {
                Path file = it.next();
                if (!Files.isDirectory(file)) {
                    files.add(file);
                }
            }
        } catch (IOException e) {
            throw new MzkRuntimeException("Error when opening the asset folder containing the artist additional info", e);
        }

        // Creating the thread pool.
        ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() - 1);

        int startIndex = 0;
        // Split the list in multiple buffers.
        for (int endIndex = BUFFER_SIZE; endIndex <= files.size(); endIndex += BUFFER_SIZE) {
            executor.submit(integrateArtistAdditionalInfoBuffer(files.subList(startIndex, endIndex)));
        }

        // Checking if the is any artists left in the integration buffer not processed.
        if (startIndex < files.size()) {
            // There is some artist not processed.
            executor.submit(integrateArtistAdditionalInfoBuffer(files.subList(startIndex, files.size())));
        }

        // No more job accepted.
        executor.shutdown();
        ThreadPoolHelper.waitPoolFinish(executor, "Timeout during the artist additional information integration.");
    }

    private Runnable integrateArtistAdditionalInfoBuffer(List<Path> files) {
        return () -> {
            try {
                log.info("Adding the additional information processing: {} JSON files", files.size());
                // Converting each file into JSON object and converting it into database objects ready to be added.
                ArtistAdditionalInfoContainer container = new ArtistAdditionalInfoContainer();
                for (Path file : files) {
                    try {
                        // Reading the JSON file and adding it to the container.
                        ParsedArtistAdditionalInfoDto artistInfo = objectMapper.readValue(file.toFile(), ParsedArtistAdditionalInfoDto.class);
                        // Adding the artist information into the container.
                        container.addAdditionalInfo(ArtistAdditionalInfoDto.buildFromParsed(artistInfo));
                        // Adding the testimonies and the bio in the container.
                        container.addTestimonies(testimonyIntegrationManager.buildTestimonies(artistInfo.testimony(), artistInfo.name()));
                        container.addBios(bioIntegrationManager.buildBio(artistInfo.bio(), artistInfo.name()));
                    } catch (IOException e) {
                        log.error("Error while reading the file : {}", file, e);
                    }
                }

                log.info("Loading the information contained in the database.");
                // Fetching the information into the database.
                loadDatabaseReferenceData(container);

                // Inserting the element in the database.
                ArtistAdditionalInfoLinkerDto linker = insertElementsIntoDatabase(container);

                // Updating all the artists with the data contained in the JSON.
                artistIntegrationManager.enrichArtistFromJson(container, linker);

                // Creating the links between artists and the other objects.
                artistAdditionalInfoLinkerDAO.linkArtistAdditionalInfo(linker);

                // Inserting the links (they need the artist id before)
                linkIntegrationManager.insertLinks(container);
            } catch (Exception e) {
                log.error("An error occurred during the integration of the additional artist information.", e);
            }
        };
    }

    /**
     * Load the values already contained in the database.
     *
     * @param container The information about the artists to be inserted.
     */
    private void loadDatabaseReferenceData(ArtistAdditionalInfoContainer container) {
        // Fetching all the countries.
        container.setCountryMap(countryManager.getTrigramMapFromTrigramList(container.getCountries()));
        // Fetching all the artists.
        container.setArtistMap(artistManager.getArtistByIdMap(container.getArtists()));
        // Fetching all the alias.
        container.setAliasMap(aliasManager.getAliasByNameMap(container.getAliases()));
        // Fetching all the time intervals
        container.setIntervalMap(timeIntervalManager.getTimeIntervalMap(container.getYearsActive()));
    }

    /**
     * Insert the element found in the artist JSON.
     *
     * @param container The information retrieved in the JSONs.
     */
    private ArtistAdditionalInfoLinkerDto insertElementsIntoDatabase(ArtistAdditionalInfoContainer container) {
        // Inserting the aliases into the database.
        aliasIntegrationManager.insertAliases(container);
        // Inserting the time intervals into the database.
        timeIntervalIntegrationManager.insertTimeIntervals(container);
        // Inserting the artists not present in the database.
        artistIntegrationManager.createMissingArtistsFromJson(container);
        // Inserting the testimonies into the database.
        ArtistAdditionalInfoLinkerDto linkerInfo = new ArtistAdditionalInfoLinkerDto();
        testimonyIntegrationManager.insertTestimonies(container, linkerInfo);
        // Inserting the artist bios
        bioIntegrationManager.insertBios(container, linkerInfo);


        return linkerInfo;
    }

}
