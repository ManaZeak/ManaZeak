package org.manazeak.manazeak.daos.reference;

import lombok.NonNull;
import org.manazeak.manazeak.entity.reference.Locale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Data Access Object for Locale using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface LocaleDAO extends CrudRepository<Locale, Long> {

    Optional<Locale> findLocaleByCode(String code);

    /**
     * Get the configured user locale
     *
     * @param userId The id of the user.
     * @return The user locale if one is set.
     */
    @Query("""
            select locale from MzkUser usr
            join usr.locale locale
            where usr.userId = :userId
            """)
    Optional<Locale> getUserLocale(@NonNull Long userId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT