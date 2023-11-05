package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Set;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.ManyToMany;
import org.manazeak.manazeak.entity.reference.BandRole;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;

/**
 * Contains the information about each band member.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="band_member")
public class BandMember implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long bandMemberId;
	private Artist band;
	private Artist member;
	private Set<BandRole> bandRoleList;

    /**
     * No comment found in model diagram
     * @return value of bandMemberId
     */
    @Id
    @SequenceGenerator(name="SEQ_BAND_MEMBER", sequenceName="SEQ_BAND_MEMBER", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_BAND_MEMBER")
    @Column(name="band_member_id", nullable=false)
	public Long getBandMemberId(){
		return bandMemberId;
    }  
    /**
     * No comment found in model diagram
     * @param bandMemberId new value to give to bandMemberId
     */
	public void setBandMemberId(final Long bandMemberId){
		this.bandMemberId = bandMemberId;
    }  
    /**
     * Association artist_band_member to Artist
     * @return value of band
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="band_id", referencedColumnName="artist_id")
	public Artist getBand(){
		return band;
    }  
    /**
     * Association artist_band_member to Artist
     * @param band new value to give to band
     */
	public void setBand(final Artist band){
		this.band = band;
    }  
    /**
     * Association band_member_artist to Artist
     * @return value of member
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="member_id", referencedColumnName="artist_id")
	public Artist getMember(){
		return member;
    }  
    /**
     * Association band_member_artist to Artist
     * @param member new value to give to member
     */
	public void setMember(final Artist member){
		this.member = member;
    }  
    /**
     * Association member_role to BandRole
     * @return value of bandRoleList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="member_role", joinColumns=@JoinColumn(name = "band_member_id"), inverseJoinColumns=@JoinColumn(name = "band_role_id"))
	public Set<BandRole> getBandRoleList(){
		return bandRoleList;
    }  
    /**
     * Association member_role to BandRole
     * @param bandRoleList new value to give to bandRoleList
     */
	public void setBandRoleList(final Set<BandRole> bandRoleList){
		this.bandRoleList = bandRoleList;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (bandMemberId == null? 0 : bandMemberId.hashCode());
			
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
	    BandMember otherBandMember = (BandMember) other;
	    
		return (bandMemberId == null ?  (otherBandMember.bandMemberId == null) : bandMemberId.equals(otherBandMember.bandMemberId))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}