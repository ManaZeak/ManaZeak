package org.manazeak.manazeak.entity.reference;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.SequenceGenerator;
import javax.persistence.Id;
import javax.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="website_type")
public class WebsiteType implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long websiteId;
	private String label;
	private String assetPath;

    /**
     * No comment found in model diagram
     * @return value of websiteId
     */
    @Id
    @SequenceGenerator(name="SEQ_WEBSITE_TYPE", sequenceName="SEQ_WEBSITE_TYPE", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_WEBSITE_TYPE")
    @Column(name="website_id", nullable=false)
	public Long getWebsiteId(){
		return websiteId;
    }  
    /**
     * No comment found in model diagram
     * @param websiteId new value to give to websiteId
     */
	public void setWebsiteId(final Long websiteId){
		this.websiteId = websiteId;
    }  
    /**
     * No comment found in model diagram
     * @return value of label
     */
    @Column(name="label", nullable=false)
	public String getLabel(){
		return label;
    }  
    /**
     * No comment found in model diagram
     * @param label new value to give to label
     */
	public void setLabel(final String label){
		this.label = label;
    }  
    /**
     * No comment found in model diagram
     * @return value of assetPath
     */
    @Column(name="asset_path", nullable=false)
	public String getAssetPath(){
		return assetPath;
    }  
    /**
     * No comment found in model diagram
     * @param assetPath new value to give to assetPath
     */
	public void setAssetPath(final String assetPath){
		this.assetPath = assetPath;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (websiteId == null? 0 : websiteId.hashCode());
		result = 31 * result + (label == null? 0 : label.hashCode());
		result = 31 * result + (assetPath == null? 0 : assetPath.hashCode());
			
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
	    WebsiteType otherWebsiteType = (WebsiteType) other;
	    
		return (websiteId == null ?  (otherWebsiteType.websiteId == null) : websiteId.equals(otherWebsiteType.websiteId))
			&& (label == null ?  (otherWebsiteType.label == null) : label.equals(otherWebsiteType.label))
			&& (assetPath == null ?  (otherWebsiteType.assetPath == null) : assetPath.equals(otherWebsiteType.assetPath))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}