package org.manazeak.manazeak.entity.management;

import java.io.Serializable;
import org.manazeak.manazeak.entity.track.Artist;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import org.manazeak.manazeak.entity.track.Label;
import org.manazeak.manazeak.entity.track.Album;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import org.manazeak.manazeak.entity.track.Genre;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="thumbnail_error")
public class ThumbnailError implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long thumbErrId;
	private String error;
	private Boolean processed;
	private Label label;
	private Album album;
	private Genre genre;
	private Artist artist;

    /**
     * No comment found in model diagram
     * @return value of thumbErrId
     */
    @Id
    @SequenceGenerator(name="SEQ_THUMBNAIL_ERROR", sequenceName="SEQ_THUMBNAIL_ERROR", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_THUMBNAIL_ERROR")
    @Column(name="thumb_err_id", nullable=false)
	public Long getThumbErrId(){
		return thumbErrId;
    }  
    /**
     * No comment found in model diagram
     * @param thumbErrId new value to give to thumbErrId
     */
	public void setThumbErrId(final Long thumbErrId){
		this.thumbErrId = thumbErrId;
    }  
    /**
     * No comment found in model diagram
     * @return value of error
     */
    @Column(name="error", nullable=false)
	public String getError(){
		return error;
    }  
    /**
     * No comment found in model diagram
     * @param error new value to give to error
     */
	public void setError(final String error){
		this.error = error;
    }  
    /**
     * No comment found in model diagram
     * @return value of processed
     */
    @Column(name="processed", nullable=false)
	public Boolean getProcessed(){
		return processed;
    }  
    /**
     * No comment found in model diagram
     * @param processed new value to give to processed
     */
	public void setProcessed(final Boolean processed){
		this.processed = processed;
    }  
    /**
     * Association label_thumb_error to Label
     * @return value of label
     */
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="label_id", referencedColumnName="label_id")
	public Label getLabel(){
		return label;
    }  
    /**
     * Association label_thumb_error to Label
     * @param label new value to give to label
     */
	public void setLabel(final Label label){
		this.label = label;
    }  
    /**
     * Association thumb_error_album to Album
     * @return value of album
     */
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="album_id", referencedColumnName="album_id")
	public Album getAlbum(){
		return album;
    }  
    /**
     * Association thumb_error_album to Album
     * @param album new value to give to album
     */
	public void setAlbum(final Album album){
		this.album = album;
    }  
    /**
     * Association thumb_error_genre to Genre
     * @return value of genre
     */
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="genre_id", referencedColumnName="genre_id")
	public Genre getGenre(){
		return genre;
    }  
    /**
     * Association thumb_error_genre to Genre
     * @param genre new value to give to genre
     */
	public void setGenre(final Genre genre){
		this.genre = genre;
    }  
    /**
     * Association thumb_error_artist to Artist
     * @return value of artist
     */
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="artist_id", referencedColumnName="artist_id")
	public Artist getArtist(){
		return artist;
    }  
    /**
     * Association thumb_error_artist to Artist
     * @param artist new value to give to artist
     */
	public void setArtist(final Artist artist){
		this.artist = artist;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (thumbErrId == null? 0 : thumbErrId.hashCode());
		result = 31 * result + (error == null? 0 : error.hashCode());
		result = 31 * result + (processed == null? 0 : processed.hashCode());
			
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
	    ThumbnailError otherThumbnailError = (ThumbnailError) other;
	    
		return (thumbErrId == null ?  (otherThumbnailError.thumbErrId == null) : thumbErrId.equals(otherThumbnailError.thumbErrId))
			&& (error == null ?  (otherThumbnailError.error == null) : error.equals(otherThumbnailError.error))
			&& (processed == null ?  (otherThumbnailError.processed == null) : processed.equals(otherThumbnailError.processed))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}