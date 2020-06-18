package org.manazeak.manazeak.entity.security;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * The role of a user.
 * <p>
 * This file has been automatically generated
 */
@Entity
@Table(name = "role")
public class Role implements Serializable {
    /**
     * Serial ID
     */
    private static final long serialVersionUID = 1L;

    private Long roleId;
    private String codeRole;
    private Set<Privilege> privilegeList;

    /**
     * No comment found in model diagram
     *
     * @return value of roleId
     */
    @Id
    @SequenceGenerator(name = "SEQ_ROLE", sequenceName = "SEQ_ROLE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ROLE")
    @Column(name = "role_id", nullable = false)
    public Long getRoleId() {
        return roleId;
    }

    /**
     * No comment found in model diagram
     *
     * @param roleId new value to give to roleId
     */
    public void setRoleId(final Long roleId) {
        this.roleId = roleId;
    }

    /**
     * No comment found in model diagram
     *
     * @return value of codeRole
     */
    @Column(name = "code_role", nullable = false)
    public String getCodeRole() {
        return codeRole;
    }

    /**
     * No comment found in model diagram
     *
     * @param codeRole new value to give to codeRole
     */
    public void setCodeRole(final String codeRole) {
        this.codeRole = codeRole;
    }

    /**
     * Association privileges_role to Privilege
     *
     * @return value of privilegeList
     */
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "privileges_role", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "privilege_id"))
    public Set<Privilege> getPrivilegeList() {
        return privilegeList;
    }

    /**
     * Association privileges_role to Privilege
     *
     * @param privilegeList new value to give to privilegeList
     */
    public void setPrivilegeList(final Set<Privilege> privilegeList) {
        this.privilegeList = privilegeList;
    }

    @Override
    public int hashCode() {
        // Start with a non-zero constant. Prime is preferred
        int result = 17;

        // Calculating hashcode with all "primitives" attributes
        result = 31 * result + (roleId == null ? 0 : roleId.hashCode());
        result = 31 * result + (codeRole == null ? 0 : codeRole.hashCode());

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
        Role otherRole = (Role) other;

        return (roleId == null ? (otherRole.roleId == null) : roleId.equals(otherRole.roleId))
                && (codeRole == null ? (otherRole.codeRole == null) : codeRole.equals(otherRole.codeRole))
                ;
    }


// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}