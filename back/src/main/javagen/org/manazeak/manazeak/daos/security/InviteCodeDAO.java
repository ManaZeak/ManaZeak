package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.InviteCode;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

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

    /**
     * Get the depth of the given user by it's id.
     * @return the depth of the user.
     */
    @Query(value = "WITH RECURSIVE descendants AS ( "
                + "SELECT usr.user_id, cast(0 AS bigint) parent, 0 depth "
                + "FROM mzk_user usr "
                + "where user_id = 1 "
                + "UNION "
                + "SELECT p.user_id, ui.user_id parent, d.depth+ 1 "
                + "FROM mzk_user p "
                + "INNER JOIN invite_code ic on p.invite_code_id = ic.invite_code_id "
                + "INNER JOIN user_invite ui on ic.invite_code_id = ui.invite_code_id "
                + "INNER JOIN descendants d ON ui.user_id = d.user_id "
            + ") "
            + "SELECT depth "
            + "FROM descendants d "
            + "INNER JOIN mzk_user usr on d.user_id = usr.user_id "
            + "where d.user_id != 1 "
            + "and d.user_id = :user "
            , nativeQuery = true)
    int getParentUserDepth(@Param("user") Long userId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT