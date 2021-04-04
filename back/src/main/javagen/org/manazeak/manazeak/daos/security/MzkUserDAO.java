package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.dto.admin.UserListLineProjection;
import org.manazeak.manazeak.entity.dto.user.MzkUserDetailProjection;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for MzkUser using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface MzkUserDAO extends CrudRepository<MzkUser, Long> {

    /**
     * Get a user from the username.
     *
     * @param username exact username of the user.
     * @return the user.
     */
    Optional<MzkUser> getByUsername(String username);

    /**
     * Get a user projection from the user id.
     *
     * @param userId The id of the user needed to get the details.
     * @return The information about the user.
     */
    @Query("select " +
            "   usr.username as username, " +
            "   usr.name as name, " +
            "   usr.surname as surname, " +
            "   usr.birthDate as birthDate, " +
            "   usr.profilePic as avatar, " +
            "   usr.bio as bio, " +
            "   usr.mail as email, " +
            "   userCountry.name as country, " +
            "   userLocale.value as locale, " +
            "   inv.value as inviteCode," +
            "   parent.name as parentName," +
            "   parent.surname as parentSurname, " +
            "   parent.profilePic as parentAvatar " +
            "from MzkUser usr " +
            "inner join InviteCode inv on inv.parent = usr " +
            "left join usr.country userCountry " +
            "left join usr.locale userLocale " +
            "inner join usr.inviteCode.parent parent " +
            "where usr.userId = :userId " +
            "   and inv.isActive = true")
    MzkUserDetailProjection getUserDetailFromUserId(@Param("userId") Long userId);

    /**
     * Get all the users from the database in a list way.
     *
     * @return the users of the database.
     */
    @Query("select " +
            "   usr.userId as userId, " +
            "   usr.username as username, " +
            "   usr.profilePic as avatar, " +
            "   usr.creationDate as creationDate, " +
            "   usr.role.roleId as roleId, " +
            "   usr.isActive as isActive " +
            "from MzkUser usr")
    List<UserListLineProjection> getAllLineUsers();

    /**
     * Delete a user wy it's id and return the number of modified lines.
     *
     * @param userId The user id associated to the user that must be deleted.
     * @return The number of modified lines.
     */
    Integer removeByUserId(Long userId);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT