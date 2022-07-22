package org.manazeak.manazeak;

import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.manazeak.manazeak.constant.library.LibraryConstant;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

// Activating the test profile to use the mocks.
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
// Transaction on each method (no commits)
@Transactional
public abstract class AbstractManaZeakTest {

    /**
     * Application's root path.
     */
    protected static final String ROOT_PATH = System.getProperty("user.dir");

    @Autowired
    protected EntityManager entityManager;

    /**
     * Flush et clear de la session
     */
    protected void cleanJpa() {
        entityManager.flush();
        entityManager.clear();
    }

    /**
     * @return Get the path of the application on in the file system
     */
    protected String getApplicationPath() {
        try {
            return FileUtils.toFile(getClass().getProtectionDomain()
                    .getCodeSource().getLocation().toURI().toURL()).getAbsolutePath() + "/";
        } catch (final Exception e) {
            throw new MzkRuntimeException("Impossible to get the application path.", e);
        }
    }

    protected Path getTempAppFolderPath() {
        return Paths.get(getApplicationPath()).resolve("temp");
    }

    @AfterEach
    void doTearDown() throws IOException {
        // Cleaning the folder
        FileUtils.deleteDirectory(getTempAppFolderPath().toFile());
    }

    @BeforeEach
    void doSetup() {
        // Setting the path of the test library
        LibraryConstant.LIBRARY_PATH = Paths.get(getApplicationPath(), "service", "library");
    }

    /**
     * @return Get the application path.
     */
    protected Path getApplicationPathPath() {
        return Paths.get(getApplicationPath());
    }
}

