package org.manazeak.manazeak;

import org.apache.commons.io.FileUtils;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

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
            throw new MzkRuntimeException("Impossible to get the application path.", "", e);
        }
    }
}

