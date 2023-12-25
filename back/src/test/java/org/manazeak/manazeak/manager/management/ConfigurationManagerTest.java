package org.manazeak.manazeak.manager.management;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.manazeak.manazeak.AbstractManaZeakTest;
import org.manazeak.manazeak.constant.management.ConfigurationEnum;
import org.manazeak.manazeak.daos.management.ConfigurationDAO;
import org.manazeak.manazeak.entity.management.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Test the configuration handling in the application.
 */
class ConfigurationManagerTest extends AbstractManaZeakTest {

    private static final String EXPECTED_VALUE = "expected_V";
    @Autowired
    private ConfigurationManager configurationManager;
    @Autowired
    private ConfigurationDAO configurationDAO;

    @Test
    void testConfigurationResolver() {
        String value = configurationManager.resolveConfiguration(EXPECTED_VALUE, String.class);
        Assertions.assertEquals(EXPECTED_VALUE, value);
    }

    @Test
    void testEmptyConfiguration() {
        Integer value = configurationManager.resolveConfiguration(null, Integer.class);
        Assertions.assertNull(value);
    }

    @Test
    void testInvalidConfigResolution() {
        Assertions.assertThrows(NumberFormatException.class, () ->
                configurationManager.resolveConfiguration(EXPECTED_VALUE, Integer.class))
        ;
    }

    @Test
    void testIntegerResolution() {
        Integer value = configurationManager.resolveConfiguration("1", Integer.class);
        Assertions.assertEquals(1, value, "The integer value wasn't parsed properly.");
    }

    @Test
    void testBooleanValueResolution() {
        Boolean value = configurationManager.resolveConfiguration("true", Boolean.class);
        Assertions.assertTrue(value, "The boolean value wasn't converted correctly.");
    }

    @Test
    void testBooleanToStringValueResolution() {
        Boolean value = configurationManager.resolveConfiguration(Boolean.TRUE.toString(), Boolean.class);
        Assertions.assertTrue(value, "The boolean value wasn't converted correctly.");
    }

    @Test
    void testGetAndCreateConfig() {
        // Getting the configuration from the database.
        Configuration configuration = configurationManager.getOrCreateConfig(ConfigurationEnum.DEFAULT_LOGIN);
        // Checking if the configuration is present in the database.
        Assertions.assertTrue(configurationDAO.existsById(configuration.getConfigurationId()));
    }
}