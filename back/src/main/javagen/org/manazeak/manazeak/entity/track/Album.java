package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import javax.persistence.ManyToMany;
import java.time.LocalDate;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.CascadeType;
import org.manazeak.manazeak.entity.reference.CompilationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;

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
	private Set<Bio> bioList;
	private CompilationType compilationType;
	private Label label;
	private Cover cover;
	private Band band;

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
     * Association album_cover to Cover
     * @return value of cover
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="cover_id", referencedColumnName="cover_id")
	public Cover getCover(){
		return cover;
    }  
    /**
     * Association album_cover to Cover
     * @param cover new value to give to cover
     */
	public void setCover(final Cover cover){
		this.cover = cover;
    }  
    /**
     * Association album_band to Band
     * @return value of band
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="band_id", referencedColumnName="band_id")
	public Band getBand(){
		return band;
    }  
    /**
     * Association album_band to Band
     * @param band new value to give to band
     */
	public void setBand(final Band band){
		this.band = band;
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
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}