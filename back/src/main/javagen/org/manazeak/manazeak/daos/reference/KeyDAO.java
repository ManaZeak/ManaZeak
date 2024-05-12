package org.manazeak.manazeak.daos.reference;

import org.manazeak.manazeak.entity.dto.library.integration.key.KeyLinkerProjection;
import org.manazeak.manazeak.entity.reference.Key;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Data Access Object for Key using Spring JpaRepository interface
 * This file has been automatically generated
 */
public interface KeyDAO extends JpaRepository<Key, Long> {

    @Query("select keyId as keyId, label as label from Key")
    List<KeyLinkerProjection> getAll();

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT