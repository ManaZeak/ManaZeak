package org.manazeak.manazeak.entity.reference;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

/**
 * The countries on the earth.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="country")
public class Country implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long countryId;
	private String name;
	private String trigram;
	private String capitalName;
	private Double capitalLat;
	private Double capitalLong;
	private Double centerLat;
	private Double centerLong;

    /**
     * No comment found in model diagram
     * @return value of countryId
     */
    @Id
    @SequenceGenerator(name="SEQ_COUNTRY", sequenceName="SEQ_COUNTRY", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_COUNTRY")
    @Column(name="country_id", nullable=false)
	public Long getCountryId(){
		return countryId;
    }  
    /**
     * No comment found in model diagram
     * @param countryId new value to give to countryId
     */
	public void setCountryId(final Long countryId){
		this.countryId = countryId;
    }  
    /**
     * No comment found in model diagram
     * @return value of name
     */
    @Column(name="name", nullable=false)
	public String getName(){
		return name;
    }  
    /**
     * No comment found in model diagram
     * @param name new value to give to name
     */
	public void setName(final String name){
		this.name = name;
    }  
    /**
     * No comment found in model diagram
     * @return value of trigram
     */
    @Column(name="trigram", nullable=false)
	public String getTrigram(){
		return trigram;
    }  
    /**
     * No comment found in model diagram
     * @param trigram new value to give to trigram
     */
	public void setTrigram(final String trigram){
		this.trigram = trigram;
    }  
    /**
     * No comment found in model diagram
     * @return value of capitalName
     */
    @Column(name="capital_name", nullable=false)
	public String getCapitalName(){
		return capitalName;
    }  
    /**
     * No comment found in model diagram
     * @param capitalName new value to give to capitalName
     */
	public void setCapitalName(final String capitalName){
		this.capitalName = capitalName;
    }  
    /**
     * No comment found in model diagram
     * @return value of capitalLat
     */
    @Column(name="capital_lat", nullable=false)
	public Double getCapitalLat(){
		return capitalLat;
    }  
    /**
     * No comment found in model diagram
     * @param capitalLat new value to give to capitalLat
     */
	public void setCapitalLat(final Double capitalLat){
		this.capitalLat = capitalLat;
    }  
    /**
     * No comment found in model diagram
     * @return value of capitalLong
     */
    @Column(name="capital_long", nullable=false)
	public Double getCapitalLong(){
		return capitalLong;
    }  
    /**
     * No comment found in model diagram
     * @param capitalLong new value to give to capitalLong
     */
	public void setCapitalLong(final Double capitalLong){
		this.capitalLong = capitalLong;
    }  
    /**
     * No comment found in model diagram
     * @return value of centerLat
     */
    @Column(name="center_lat", nullable=false)
	public Double getCenterLat(){
		return centerLat;
    }  
    /**
     * No comment found in model diagram
     * @param centerLat new value to give to centerLat
     */
	public void setCenterLat(final Double centerLat){
		this.centerLat = centerLat;
    }  
    /**
     * No comment found in model diagram
     * @return value of centerLong
     */
    @Column(name="center_long", nullable=false)
	public Double getCenterLong(){
		return centerLong;
    }  
    /**
     * No comment found in model diagram
     * @param centerLong new value to give to centerLong
     */
	public void setCenterLong(final Double centerLong){
		this.centerLong = centerLong;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (countryId == null? 0 : countryId.hashCode());
		result = 31 * result + (name == null? 0 : name.hashCode());
		result = 31 * result + (trigram == null? 0 : trigram.hashCode());
		result = 31 * result + (capitalName == null? 0 : capitalName.hashCode());
		result = 31 * result + (capitalLat == null? 0 : capitalLat.hashCode());
		result = 31 * result + (capitalLong == null? 0 : capitalLong.hashCode());
		result = 31 * result + (centerLat == null? 0 : centerLat.hashCode());
		result = 31 * result + (centerLong == null? 0 : centerLong.hashCode());
			
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
	    Country otherCountry = (Country) other;
	    
		return (countryId == null ?  (otherCountry.countryId == null) : countryId.equals(otherCountry.countryId))
			&& (name == null ?  (otherCountry.name == null) : name.equals(otherCountry.name))
			&& (trigram == null ?  (otherCountry.trigram == null) : trigram.equals(otherCountry.trigram))
			&& (capitalName == null ?  (otherCountry.capitalName == null) : capitalName.equals(otherCountry.capitalName))
			&& (capitalLat == null ?  (otherCountry.capitalLat == null) : capitalLat.equals(otherCountry.capitalLat))
			&& (capitalLong == null ?  (otherCountry.capitalLong == null) : capitalLong.equals(otherCountry.capitalLong))
			&& (centerLat == null ?  (otherCountry.centerLat == null) : centerLat.equals(otherCountry.centerLat))
			&& (centerLong == null ?  (otherCountry.centerLong == null) : centerLong.equals(otherCountry.centerLong))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}