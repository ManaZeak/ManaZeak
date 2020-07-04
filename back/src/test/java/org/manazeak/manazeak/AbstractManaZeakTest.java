package org.manazeak.manazeak;

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
}

