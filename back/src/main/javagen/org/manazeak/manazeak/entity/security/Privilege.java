package org.manazeak.manazeak.entity.security;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

/**
 * The privilege a role has.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="privilege")
public class Privilege implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long privilegeId;
	private String codePrivilege;

    /**
     * No comment found in model diagram
     * @return value of privilegeId
     */
    @Id
    @SequenceGenerator(name="SEQ_PRIVILEGE", sequenceName="SEQ_PRIVILEGE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_PRIVILEGE")
    @Column(name="privilege_id", nullable=false)
	public Long getPrivilegeId(){
		return privilegeId;
    }  
    /**
     * No comment found in model diagram
     * @param privilegeId new value to give to privilegeId
     */
	public void setPrivilegeId(final Long privilegeId){
		this.privilegeId = privilegeId;
    }  
    /**
     * No comment found in model diagram
     * @return value of codePrivilege
     */
    @Column(name="code_privilege", nullable=false)
	public String getCodePrivilege(){
		return codePrivilege;
    }  
    /**
     * No comment found in model diagram
     * @param codePrivilege new value to give to codePrivilege
     */
	public void setCodePrivilege(final String codePrivilege){
		this.codePrivilege = codePrivilege;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (privilegeId == null? 0 : privilegeId.hashCode());
		result = 31 * result + (codePrivilege == null? 0 : codePrivilege.hashCode());
			
		return result;
	}

	@Override
	public boolean equals(Object other){
		// Null object
	    if(other == null){
	    	return false;
	    }
	
		// Same object
	    if (this == other) {
	        return true;
	    }
	    	
		// Wrong type
	    if (this.getClass() !=  other.getClass()) {
	        return false;
	    }
	
		// Test all "primitives" attributes
	    Privilege otherPrivilege = (Privilege) other;
	    
		return (privilegeId == null ?  (otherPrivilege.privilegeId == null) : privilegeId.equals(otherPrivilege.privilegeId))
			&& (codePrivilege == null ?  (otherPrivilege.codePrivilege == null) : codePrivilege.equals(otherPrivilege.codePrivilege))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}