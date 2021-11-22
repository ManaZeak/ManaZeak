package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import org.manazeak.manazeak.entity.reference.WebsiteType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="link")
public class Link implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long linkId;
	private String url;
	private WebsiteType websiteType;

    /**
     * No comment found in model diagram
     * @return value of linkId
     */
    @Id
    @SequenceGenerator(name="SEQ_LINK", sequenceName="SEQ_LINK", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_LINK")
    @Column(name="link_id", nullable=false)
	public Long getLinkId(){
		return linkId;
    }  
    /**
     * No comment found in model diagram
     * @param linkId new value to give to linkId
     */
	public void setLinkId(final Long linkId){
		this.linkId = linkId;
    }  
    /**
     * No comment found in model diagram
     * @return value of url
     */
    @Column(name="url", nullable=false)
	public String getUrl(){
		return url;
    }  
    /**
     * No comment found in model diagram
     * @param url new value to give to url
     */
	public void setUrl(final String url){
		this.url = url;
    }  
    /**
     * Association link_type to WebsiteType
     * @return value of websiteType
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="website_id", referencedColumnName="website_id")
	public WebsiteType getWebsiteType(){
		return websiteType;
    }  
    /**
     * Association link_type to WebsiteType
     * @param websiteType new value to give to websiteType
     */
	public void setWebsiteType(final WebsiteType websiteType){
		this.websiteType = websiteType;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (linkId == null? 0 : linkId.hashCode());
		result = 31 * result + (url == null? 0 : url.hashCode());
			
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
	    Link otherLink = (Link) other;
	    
		return (linkId == null ?  (otherLink.linkId == null) : linkId.equals(otherLink.linkId))
			&& (url == null ?  (otherLink.url == null) : url.equals(otherLink.url))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}