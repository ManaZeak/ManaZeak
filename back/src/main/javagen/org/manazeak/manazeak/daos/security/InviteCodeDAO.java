package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.InviteCode;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Data Access Object for InviteCode using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface InviteCodeDAO extends CrudRepository<InviteCode, Long> {

    /**
     * Trying to get an active invite code by it's value.
     * @param inviteCodeValue the invite code value.
     * @return the invite code if it exists.
     */
    Optional<InviteCode> getInviteCodeByValueAndIsActiveTrue(String inviteCodeValue);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT