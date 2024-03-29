package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Set;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.ManyToMany;
import java.time.LocalDate;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.CascadeType;
import org.manazeak.manazeak.entity.reference.CompilationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;

/**
 * No comment found in model diagram
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="album")
public class Album implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long albumId;
	private String title;
	private Integer totalTrack;
	private Integer releaseYear;
	private LocalDate releaseDate;
	private String catalogNumber;
	private String eanUpn;
	private Double duration;
	private Integer diskTotal;
	private LocalDate startRecordingDate;
	private LocalDate endRecordingDate;
	private String location;
	private String cover;
	private Set<Bio> bioList;
	private CompilationType compilationType;
	private Label label;
	private Set<RecordingLocation> recordingLocationList;
	private Artist artist;

    /**
     * No comment found in model diagram
     * @return value of albumId
     */
    @Id
    @SequenceGenerator(name="SEQ_ALBUM", sequenceName="SEQ_ALBUM", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_ALBUM")
    @Column(name="album_id", nullable=false)
	public Long getAlbumId(){
		return albumId;
    }  
    /**
     * No comment found in model diagram
     * @param albumId new value to give to albumId
     */
	public void setAlbumId(final Long albumId){
		this.albumId = albumId;
    }  
    /**
     * No comment found in model diagram
     * @return value of title
     */
    @Column(name="title", nullable=false)
	public String getTitle(){
		return title;
    }  
    /**
     * No comment found in model diagram
     * @param title new value to give to title
     */
	public void setTitle(final String title){
		this.title = title;
    }  
    /**
     * No comment found in model diagram
     * @return value of totalTrack
     */
    @Column(name="total_track", nullable=false)
	public Integer getTotalTrack(){
		return totalTrack;
    }  
    /**
     * No comment found in model diagram
     * @param totalTrack new value to give to totalTrack
     */
	public void setTotalTrack(final Integer totalTrack){
		this.totalTrack = totalTrack;
    }  
    /**
     * No comment found in model diagram
     * @return value of releaseYear
     */
    @Column(name="release_year", nullable=false)
	public Integer getReleaseYear(){
		return releaseYear;
    }  
    /**
     * No comment found in model diagram
     * @param releaseYear new value to give to releaseYear
     */
	public void setReleaseYear(final Integer releaseYear){
		this.releaseYear = releaseYear;
    }  
    /**
     * No comment found in model diagram
     * @return value of releaseDate
     */
    @Column(name="release_date", nullable=false)
	public LocalDate getReleaseDate(){
		return releaseDate;
    }  
    /**
     * No comment found in model diagram
     * @param releaseDate new value to give to releaseDate
     */
	public void setReleaseDate(final LocalDate releaseDate){
		this.releaseDate = releaseDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of catalogNumber
     */
    @Column(name="catalog_number", nullable=true)
	public String getCatalogNumber(){
		return catalogNumber;
    }  
    /**
     * No comment found in model diagram
     * @param catalogNumber new value to give to catalogNumber
     */
	public void setCatalogNumber(final String catalogNumber){
		this.catalogNumber = catalogNumber;
    }  
    /**
     * No comment found in model diagram
     * @return value of eanUpn
     */
    @Column(name="ean_upn", nullable=true)
	public String getEanUpn(){
		return eanUpn;
    }  
    /**
     * No comment found in model diagram
     * @param eanUpn new value to give to eanUpn
     */
	public void setEanUpn(final String eanUpn){
		this.eanUpn = eanUpn;
    }  
    /**
     * No comment found in model diagram
     * @return value of duration
     */
    @Column(name="duration", nullable=false)
	public Double getDuration(){
		return duration;
    }  
    /**
     * No comment found in model diagram
     * @param duration new value to give to duration
     */
	public void setDuration(final Double duration){
		this.duration = duration;
    }  
    /**
     * No comment found in model diagram
     * @return value of diskTotal
     */
    @Column(name="disk_total", nullable=false)
	public Integer getDiskTotal(){
		return diskTotal;
    }  
    /**
     * No comment found in model diagram
     * @param diskTotal new value to give to diskTotal
     */
	public void setDiskTotal(final Integer diskTotal){
		this.diskTotal = diskTotal;
    }  
    /**
     * No comment found in model diagram
     * @return value of startRecordingDate
     */
    @Column(name="start_recording_date", nullable=true)
	public LocalDate getStartRecordingDate(){
		return startRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @param startRecordingDate new value to give to startRecordingDate
     */
	public void setStartRecordingDate(final LocalDate startRecordingDate){
		this.startRecordingDate = startRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of endRecordingDate
     */
    @Column(name="end_recording_date", nullable=true)
	public LocalDate getEndRecordingDate(){
		return endRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @param endRecordingDate new value to give to endRecordingDate
     */
	public void setEndRecordingDate(final LocalDate endRecordingDate){
		this.endRecordingDate = endRecordingDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of location
     */
    @Column(name="location", nullable=false)
	public String getLocation(){
		return location;
    }  
    /**
     * No comment found in model diagram
     * @param location new value to give to location
     */
	public void setLocation(final String location){
		this.location = location;
    }  
    /**
     * No comment found in model diagram
     * @return value of cover
     */
    @Column(name="cover", nullable=true)
	public String getCover(){
		return cover;
    }  
    /**
     * No comment found in model diagram
     * @param cover new value to give to cover
     */
	public void setCover(final String cover){
		this.cover = cover;
    }  
    /**
     * Association album_bio to Bio
     * @return value of bioList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="album_bio", joinColumns=@JoinColumn(name = "album_id"), inverseJoinColumns=@JoinColumn(name = "bio_id"))
	public Set<Bio> getBioList(){
		return bioList;
    }  
    /**
     * Association album_bio to Bio
     * @param bioList new value to give to bioList
     */
	public void setBioList(final Set<Bio> bioList){
		this.bioList = bioList;
    }  
    /**
     * Association album_compilation to CompilationType
     * @return value of compilationType
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="compilation_type_id", referencedColumnName="compilation_type_id")
	public CompilationType getCompilationType(){
		return compilationType;
    }  
    /**
     * Association album_compilation to CompilationType
     * @param compilationType new value to give to compilationType
     */
	public void setCompilationType(final CompilationType compilationType){
		this.compilationType = compilationType;
    }  
    /**
     * Association album_label to Label
     * @return value of label
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="label_id", referencedColumnName="label_id")
	public Label getLabel(){
		return label;
    }  
    /**
     * Association album_label to Label
     * @param label new value to give to label
     */
	public void setLabel(final Label label){
		this.label = label;
    }  
    /**
     * Association album_recording_location to RecordingLocation
     * @return value of recordingLocationList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="album_recording_location", joinColumns=@JoinColumn(name = "album_id"), inverseJoinColumns=@JoinColumn(name = "recording_location_id"))
	public Set<RecordingLocation> getRecordingLocationList(){
		return recordingLocationList;
    }  
    /**
     * Association album_recording_location to RecordingLocation
     * @param recordingLocationList new value to give to recordingLocationList
     */
	public void setRecordingLocationList(final Set<RecordingLocation> recordingLocationList){
		this.recordingLocationList = recordingLocationList;
    }  
    /**
     * Association album_band to Artist
     * @return value of artist
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="artist_id", referencedColumnName="artist_id")
	public Artist getArtist(){
		return artist;
    }  
    /**
     * Association album_band to Artist
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
		result = 31 * result + (albumId == null? 0 : albumId.hashCode());
		result = 31 * result + (title == null? 0 : title.hashCode());
		result = 31 * result + (totalTrack == null? 0 : totalTrack.hashCode());
		result = 31 * result + (releaseYear == null? 0 : releaseYear.hashCode());
		result = 31 * result + (releaseDate == null? 0 : releaseDate.hashCode());
		result = 31 * result + (catalogNumber == null? 0 : catalogNumber.hashCode());
		result = 31 * result + (eanUpn == null? 0 : eanUpn.hashCode());
		result = 31 * result + (duration == null? 0 : duration.hashCode());
		result = 31 * result + (diskTotal == null? 0 : diskTotal.hashCode());
		result = 31 * result + (startRecordingDate == null? 0 : startRecordingDate.hashCode());
		result = 31 * result + (endRecordingDate == null? 0 : endRecordingDate.hashCode());
		result = 31 * result + (location == null? 0 : location.hashCode());
		result = 31 * result + (cover == null? 0 : cover.hashCode());
			
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
	    Album otherAlbum = (Album) other;
	    
		return (albumId == null ?  (otherAlbum.albumId == null) : albumId.equals(otherAlbum.albumId))
			&& (title == null ?  (otherAlbum.title == null) : title.equals(otherAlbum.title))
			&& (totalTrack == null ?  (otherAlbum.totalTrack == null) : totalTrack.equals(otherAlbum.totalTrack))
			&& (releaseYear == null ?  (otherAlbum.releaseYear == null) : releaseYear.equals(otherAlbum.releaseYear))
			&& (releaseDate == null ?  (otherAlbum.releaseDate == null) : releaseDate.equals(otherAlbum.releaseDate))
			&& (catalogNumber == null ?  (otherAlbum.catalogNumber == null) : catalogNumber.equals(otherAlbum.catalogNumber))
			&& (eanUpn == null ?  (otherAlbum.eanUpn == null) : eanUpn.equals(otherAlbum.eanUpn))
			&& (duration == null ?  (otherAlbum.duration == null) : duration.equals(otherAlbum.duration))
			&& (diskTotal == null ?  (otherAlbum.diskTotal == null) : diskTotal.equals(otherAlbum.diskTotal))
			&& (startRecordingDate == null ?  (otherAlbum.startRecordingDate == null) : startRecordingDate.equals(otherAlbum.startRecordingDate))
			&& (endRecordingDate == null ?  (otherAlbum.endRecordingDate == null) : endRecordingDate.equals(otherAlbum.endRecordingDate))
			&& (location == null ?  (otherAlbum.location == null) : location.equals(otherAlbum.location))
			&& (cover == null ?  (otherAlbum.cover == null) : cover.equals(otherAlbum.cover))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}