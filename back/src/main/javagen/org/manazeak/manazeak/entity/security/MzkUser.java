package org.manazeak.manazeak.entity.security;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A user object.
 * <p>
 * This file has been automatically generated
 */
@Entity
@Table(name = "mzk_user")
public class MzkUser implements Serializable {
    /**
     * Serial ID
     */
    private static final long serialVersionUID = 1L;

    private Long userId;
    private Boolean isActive;
    private String password;
    private String username;
    private Role role;

    /**
     * No comment found in model diagram
     *
     * @return value of userId
     */
    @Id
    @SequenceGenerator(name = "SEQ_MZK_USER", sequenceName = "SEQ_MZK_USER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_MZK_USER")
    @Column(name = "user_id", nullable = false)
    public Long getUserId() {
        return userId;
    }

    /**
     * No comment found in model diagram
     *
     * @param userId new value to give to userId
     */
    public void setUserId(final Long userId) {
        this.userId = userId;
    }

    /**
     * No comment found in model diagram
     *
     * @return value of isActive
     */
    @Column(name = "is_active", nullable = false)
    public Boolean getIsActive() {
        return isActive;
    }

    /**
     * No comment found in model diagram
     *
     * @param isActive new value to give to isActive
     */
    public void setIsActive(final Boolean isActive) {
        this.isActive = isActive;
    }

    /**
     * No comment found in model diagram
     *
     * @return value of password
     */
    @Column(name = "password", nullable = false)
    public String getPassword() {
        return password;
    }

    /**
     * No comment found in model diagram
     *
     * @param password new value to give to password
     */
    public void setPassword(final String password) {
        this.password = password;
    }

    /**
     * No comment found in model diagram
     *
     * @return value of username
     */
    @Column(name = "username", nullable = false)
    public String getUsername() {
        return username;
    }

    /**
     * No comment found in model diagram
     *
     * @param username new value to give to username
     */
    public void setUsername(final String username) {
        this.username = username;
    }

    /**
     * Association roles_user to Role
     *
     * @return value of role
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    public Role getRole() {
        return role;
    }

    /**
     * Association roles_user to Role
     *
     * @param role new value to give to role
     */
    public void setRole(final Role role) {
        this.role = role;
    }

    @Override
    public int hashCode() {
        // Start with a non-zero constant. Prime is preferred
        int result = 17;

        // Calculating hashcode with all "primitives" attributes
        result = 31 * result + (userId == null ? 0 : userId.hashCode());
        result = 31 * result + (isActive == null ? 0 : isActive.hashCode());
        result = 31 * result + (password == null ? 0 : password.hashCode());
        result = 31 * result + (username == null ? 0 : username.hashCode());

        return result;
    }

    @Override
    public boolean equals(Object other) {
        // Null object
        if (other == null) {
            return false;
        }

        // Same object
        if (this == other) {
            return true;
        }

        // Wrong type
        if (this.getClass() != other.getClass()) {
            return false;
        }

        // Test all "primitives" attributes
        MzkUser otherMzkUser = (MzkUser) other;

        return (userId == null ? (otherMzkUser.userId == null) : userId.equals(otherMzkUser.userId))
                && (isActive == null ? (otherMzkUser.isActive == null) : isActive.equals(otherMzkUser.isActive))
                && (password == null ? (otherMzkUser.password == null) : password.equals(otherMzkUser.password))
                && (username == null ? (otherMzkUser.username == null) : username.equals(otherMzkUser.username))
                ;
    }


// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}