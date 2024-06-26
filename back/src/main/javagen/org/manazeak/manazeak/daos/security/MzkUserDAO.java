package org.manazeak.manazeak.daos.security;

import org.manazeak.manazeak.entity.dto.admin.UserListLineProjection;
import org.manazeak.manazeak.entity.dto.user.MzkUserDetailDto;
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
     * Get a user with a username and a password.
     *
     * @param username The username associated to the user.
     * @param password The password of the user encoded with the bcrypt.
     * @return The user corresponding to the criteria.
     */
    Optional<MzkUser> getByUsernameAndPassword(String username, String password);

    /**
     * Get a user projection from the user id.
     *
     * @param userId The id of the user needed to get the details.
     * @return The information about the user.
     */
    @Query("""
            select new org.manazeak.manazeak.entity.dto.user.MzkUserDetailDto(
                usr.username,
                usr.name,
                usr.surname,
                usr.mail,
                userCountry.name,
                userLocale.value,
                inv.value,
                usr.bio,
                usr.birthDate,
                usr.profilePic,
                usr.creationDate,
                parent.profilePic,
                parent.name,
                parent.surname
            )
            from MzkUser usr
            inner join InviteCode inv on inv.parent = usr
            left join usr.country userCountry
            left join usr.locale userLocale
            left join usr.inviteCode.parent parent
            where usr.userId = :userId
               and inv.isActive = true
            """)
    MzkUserDetailDto getUserDetailFromUserId(@Param("userId") Long userId);

    /**
     * Get all the users from the database in a list way.
     *
     * @return the users of the database.
     */
    @Query("""
            select
               usr.userId as userId,
               usr.username as username,
               usr.profilePic as avatar,
               usr.creationDate as creationDate,
               usr.role.roleId as roleId,
               usr.isActive as isActive
            from MzkUser usr
            """)
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