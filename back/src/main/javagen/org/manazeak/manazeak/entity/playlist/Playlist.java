package org.manazeak.manazeak.entity.playlist;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import org.manazeak.manazeak.entity.security.MzkUser;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="playlist")
public class Playlist implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long playlistId;
	private String name;
	private String description;
	private LocalDateTime creationDate;
	private Boolean isPublic;
	private Boolean isPublicEditable;
	private String imagePath;
	private Boolean appendTrack;
	private MzkUser creator;

    /**
     * No comment found in model diagram
     * @return value of playlistId
     */
    @Id
    @SequenceGenerator(name="SEQ_PLAYLIST", sequenceName="SEQ_PLAYLIST", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_PLAYLIST")
    @Column(name="playlist_id", nullable=false)
	public Long getPlaylistId(){
		return playlistId;
    }  
    /**
     * No comment found in model diagram
     * @param playlistId new value to give to playlistId
     */
	public void setPlaylistId(final Long playlistId){
		this.playlistId = playlistId;
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
     * @return value of description
     */
    @Column(name="description", nullable=true)
	public String getDescription(){
		return description;
    }  
    /**
     * No comment found in model diagram
     * @param description new value to give to description
     */
	public void setDescription(final String description){
		this.description = description;
    }  
    /**
     * No comment found in model diagram
     * @return value of creationDate
     */
    @Column(name="creation_date", nullable=false)
	public LocalDateTime getCreationDate(){
		return creationDate;
    }  
    /**
     * No comment found in model diagram
     * @param creationDate new value to give to creationDate
     */
	public void setCreationDate(final LocalDateTime creationDate){
		this.creationDate = creationDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of isPublic
     */
    @Column(name="is_public", nullable=false)
	public Boolean getIsPublic(){
		return isPublic;
    }  
    /**
     * No comment found in model diagram
     * @param isPublic new value to give to isPublic
     */
	public void setIsPublic(final Boolean isPublic){
		this.isPublic = isPublic;
    }  
    /**
     * No comment found in model diagram
     * @return value of isPublicEditable
     */
    @Column(name="is_public_editable", nullable=false)
	public Boolean getIsPublicEditable(){
		return isPublicEditable;
    }  
    /**
     * No comment found in model diagram
     * @param isPublicEditable new value to give to isPublicEditable
     */
	public void setIsPublicEditable(final Boolean isPublicEditable){
		this.isPublicEditable = isPublicEditable;
    }  
    /**
     * No comment found in model diagram
     * @return value of imagePath
     */
    @Column(name="image_path", nullable=true)
	public String getImagePath(){
		return imagePath;
    }  
    /**
     * No comment found in model diagram
     * @param imagePath new value to give to imagePath
     */
	public void setImagePath(final String imagePath){
		this.imagePath = imagePath;
    }  
    /**
     * No comment found in model diagram
     * @return value of appendTrack
     */
    @Column(name="append_track", nullable=false)
	public Boolean getAppendTrack(){
		return appendTrack;
    }  
    /**
     * No comment found in model diagram
     * @param appendTrack new value to give to appendTrack
     */
	public void setAppendTrack(final Boolean appendTrack){
		this.appendTrack = appendTrack;
    }  
    /**
     * Association playlist_creator to MzkUser
     * @return value of creator
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName="user_id")
	public MzkUser getCreator(){
		return creator;
    }  
    /**
     * Association playlist_creator to MzkUser
     * @param creator new value to give to creator
     */
	public void setCreator(final MzkUser creator){
		this.creator = creator;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (playlistId == null? 0 : playlistId.hashCode());
		result = 31 * result + (name == null? 0 : name.hashCode());
		result = 31 * result + (description == null? 0 : description.hashCode());
		result = 31 * result + (creationDate == null? 0 : creationDate.hashCode());
		result = 31 * result + (isPublic == null? 0 : isPublic.hashCode());
		result = 31 * result + (isPublicEditable == null? 0 : isPublicEditable.hashCode());
		result = 31 * result + (imagePath == null? 0 : imagePath.hashCode());
		result = 31 * result + (appendTrack == null? 0 : appendTrack.hashCode());
			
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
	    Playlist otherPlaylist = (Playlist) other;
	    
		return (playlistId == null ?  (otherPlaylist.playlistId == null) : playlistId.equals(otherPlaylist.playlistId))
			&& (name == null ?  (otherPlaylist.name == null) : name.equals(otherPlaylist.name))
			&& (description == null ?  (otherPlaylist.description == null) : description.equals(otherPlaylist.description))
			&& (creationDate == null ?  (otherPlaylist.creationDate == null) : creationDate.equals(otherPlaylist.creationDate))
			&& (isPublic == null ?  (otherPlaylist.isPublic == null) : isPublic.equals(otherPlaylist.isPublic))
			&& (isPublicEditable == null ?  (otherPlaylist.isPublicEditable == null) : isPublicEditable.equals(otherPlaylist.isPublicEditable))
			&& (imagePath == null ?  (otherPlaylist.imagePath == null) : imagePath.equals(otherPlaylist.imagePath))
			&& (appendTrack == null ?  (otherPlaylist.appendTrack == null) : appendTrack.equals(otherPlaylist.appendTrack))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}