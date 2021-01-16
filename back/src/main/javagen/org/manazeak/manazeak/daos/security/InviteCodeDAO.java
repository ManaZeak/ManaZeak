package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.security.InviteCode;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for InviteCode using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface InviteCodeDAO extends CrudRepository<InviteCode, Long> {

    /**
     * Trying to get an active invite code by it's value.
     *
     * @param inviteCodeValue the invite code value.
     * @return the invite code if it exists.
     */
    Optional<InviteCode> getInviteCodeByValueAndIsActiveTrue(String inviteCodeValue);

    /**
     * Updating all the invite code parent from a user id to a user id.
     *
     * @param user    the old user id that will be replaced.
     * @param newUser the new user that will replace the old one.
     */
    @Modifying
    @Query("update InviteCode set parent = :newUser where parent = :user")
    void updateParentByUserId(@Param("user") MzkUser user, @Param("newUser") MzkUser newUser);

    /**
     * Getting all the invite codes by the parent id.
     * @param parent The parent user.
     * @return The invite codes linked to the user.
     */
    List<InviteCode> getInviteCodesByParent(MzkUser parent);

    /**
     * Delete the invite code by parent and by status.
     *
     * @param parent   The user linked to the invite codes.
     * @param isActive The status of the invite code.
     */
    void deleteInviteCodeByParentAndIsActive(MzkUser parent, Boolean isActive);

    /**
     * Get the depth of the given user by it's id.
     *
     * @return the depth of the user.
     */
    @Query(value = "WITH RECURSIVE descendants AS ( " +
            "SELECT usr.user_id, cast(0 AS bigint) parent, 0 depth " +
            "FROM mzk_user usr " +
            "WHERE user_id = 1 " +
            "UNION " +
            "SELECT son.user_id, ic.parent parent, d.depth+ 1 " +
            "FROM mzk_user son " +
            "INNER JOIN invite_code ic on son.invite_code_id = ic.invite_code_id " +
            "INNER JOIN descendants d ON ic.parent = d.user_id " +
            ")" +
            "SELECT depth " +
            "FROM descendants d " +
            "INNER JOIN mzk_user usr on d.user_id = usr.user_id " +
            "where d.user_id != 1 " +
            "and d.user_id =  :user  "
            , nativeQuery = true)
    Optional<Integer> getParentUserDepth(@Param("user") Long userId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT