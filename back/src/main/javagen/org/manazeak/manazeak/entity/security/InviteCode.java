package org.manazeak.manazeak.entity.security;

import javax.persistence.*;
import java.io.Serializable;

/**
 * The invite code of a user.
 * <p>
 * This file has been automatically generated
 */
@Entity
@Table(name = "invite_code")
public class InviteCode implements Serializable {
    /**
     * Serial ID
     */
    private static final long serialVersionUID = 1L;

    private Long inviteCodeId;
    private String value;
    private Boolean isActive;

    /**
     * No comment found in model diagram
     *
     * @return value of inviteCodeId
     */
    @Id
    @SequenceGenerator(name = "SEQ_INVITE_CODE", sequenceName = "SEQ_INVITE_CODE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_INVITE_CODE")
    @Column(name = "invite_code_id", nullable = false)
    public Long getInviteCodeId() {
        return inviteCodeId;
    }

    /**
     * No comment found in model diagram
     *
     * @param inviteCodeId new value to give to inviteCodeId
     */
    public void setInviteCodeId(final Long inviteCodeId) {
        this.inviteCodeId = inviteCodeId;
    }

    /**
     * No comment found in model diagram
     *
     * @return value of value
     */
    @Column(name = "value", nullable = false)
    public String getValue() {
        return value;
    }

    /**
     * No comment found in model diagram
     *
     * @param value new value to give to value
     */
    public void setValue(final String value) {
        this.value = value;
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

    @Override
    public int hashCode() {
        // Start with a non-zero constant. Prime is preferred
        int result = 17;

        // Calculating hashcode with all "primitives" attributes
        result = 31 * result + (inviteCodeId == null ? 0 : inviteCodeId.hashCode());
        result = 31 * result + (value == null ? 0 : value.hashCode());
        result = 31 * result + (isActive == null ? 0 : isActive.hashCode());

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
        InviteCode otherInviteCode = (InviteCode) other;

        return (inviteCodeId == null ? (otherInviteCode.inviteCodeId == null) : inviteCodeId.equals(otherInviteCode.inviteCodeId))
                && (value == null ? (otherInviteCode.value == null) : value.equals(otherInviteCode.value))
                && (isActive == null ? (otherInviteCode.isActive == null) : isActive.equals(otherInviteCode.isActive))
                ;
    }


// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}