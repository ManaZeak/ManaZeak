package org.manazeak.manazeak.daos.reference;

import org.manazeak.manazeak.entity.reference.Locale;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Data Access Object for Locale using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface LocaleDAO extends CrudRepository<Locale, Long> {

    Optional<Locale> findLocaleByCode(String code);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT