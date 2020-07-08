package org.manazeak.manazeak.entity.security;

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
import org.manazeak.manazeak.entity.reference.Country;
import javax.persistence.Id;
import javax.persistence.JoinTable;

/**
 * A user object.
 *
 * This file has been automatically generated
 */
@Entity
@Table(name="mzk_user")
public class MzkUser implements Serializable{
	/** Serial ID */
	private static final long serialVersionUID = 1L;

	private Long userId;
	private String username;
	private String password;
	private String mail;
	private Boolean isActive;
	private String name;
	private String surname;
	private String locale;
	private LocalDate birthDate;
	private String profilePic;
	private String bio;
	private InviteCode inviteCode;
	private Set<InviteCode> inviteCodeList;
	private Country country;
	private Role role;

    /**
     * No comment found in model diagram
     * @return value of userId
     */
    @Id
    @SequenceGenerator(name="SEQ_MZK_USER", sequenceName="SEQ_MZK_USER", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_MZK_USER")
    @Column(name="user_id", nullable=false)
	public Long getUserId(){
		return userId;
    }  
    /**
     * No comment found in model diagram
     * @param userId new value to give to userId
     */
	public void setUserId(final Long userId){
		this.userId = userId;
    }  
    /**
     * No comment found in model diagram
     * @return value of username
     */
    @Column(name="username", nullable=false)
	public String getUsername(){
		return username;
    }  
    /**
     * No comment found in model diagram
     * @param username new value to give to username
     */
	public void setUsername(final String username){
		this.username = username;
    }  
    /**
     * No comment found in model diagram
     * @return value of password
     */
    @Column(name="password", nullable=false)
	public String getPassword(){
		return password;
    }  
    /**
     * No comment found in model diagram
     * @param password new value to give to password
     */
	public void setPassword(final String password){
		this.password = password;
    }  
    /**
     * No comment found in model diagram
     * @return value of mail
     */
    @Column(name="mail", nullable=false)
	public String getMail(){
		return mail;
    }  
    /**
     * No comment found in model diagram
     * @param mail new value to give to mail
     */
	public void setMail(final String mail){
		this.mail = mail;
    }  
    /**
     * No comment found in model diagram
     * @return value of isActive
     */
    @Column(name="is_active", nullable=false)
	public Boolean getIsActive(){
		return isActive;
    }  
    /**
     * No comment found in model diagram
     * @param isActive new value to give to isActive
     */
	public void setIsActive(final Boolean isActive){
		this.isActive = isActive;
    }  
    /**
     * No comment found in model diagram
     * @return value of name
     */
    @Column(name="name", nullable=true)
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
     * @return value of surname
     */
    @Column(name="surname", nullable=true)
	public String getSurname(){
		return surname;
    }  
    /**
     * No comment found in model diagram
     * @param surname new value to give to surname
     */
	public void setSurname(final String surname){
		this.surname = surname;
    }  
    /**
     * No comment found in model diagram
     * @return value of locale
     */
    @Column(name="locale", nullable=true)
	public String getLocale(){
		return locale;
    }  
    /**
     * No comment found in model diagram
     * @param locale new value to give to locale
     */
	public void setLocale(final String locale){
		this.locale = locale;
    }  
    /**
     * No comment found in model diagram
     * @return value of birthDate
     */
    @Column(name="birth_date", nullable=true)
	public LocalDate getBirthDate(){
		return birthDate;
    }  
    /**
     * No comment found in model diagram
     * @param birthDate new value to give to birthDate
     */
	public void setBirthDate(final LocalDate birthDate){
		this.birthDate = birthDate;
    }  
    /**
     * No comment found in model diagram
     * @return value of profilePic
     */
    @Column(name="profile_pic", nullable=true)
	public String getProfilePic(){
		return profilePic;
    }  
    /**
     * No comment found in model diagram
     * @param profilePic new value to give to profilePic
     */
	public void setProfilePic(final String profilePic){
		this.profilePic = profilePic;
    }  
    /**
     * No comment found in model diagram
     * @return value of bio
     */
    @Column(name="bio", nullable=true)
	public String getBio(){
		return bio;
    }  
    /**
     * No comment found in model diagram
     * @param bio new value to give to bio
     */
	public void setBio(final String bio){
		this.bio = bio;
    }  
    /**
     * Association invite_used to InviteCode
     * @return value of inviteCode
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="invite_code_id", referencedColumnName="invite_code_id")
	public InviteCode getInviteCode(){
		return inviteCode;
    }  
    /**
     * Association invite_used to InviteCode
     * @param inviteCode new value to give to inviteCode
     */
	public void setInviteCode(final InviteCode inviteCode){
		this.inviteCode = inviteCode;
    }  
    /**
     * Association user_invite to InviteCode
     * @return value of inviteCodeList
     */
    @ManyToMany(cascade={CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name="user_invite", joinColumns=@JoinColumn(name = "user_id"), inverseJoinColumns=@JoinColumn(name = "invite_code_id"))
	public Set<InviteCode> getInviteCodeList(){
		return inviteCodeList;
    }  
    /**
     * Association user_invite to InviteCode
     * @param inviteCodeList new value to give to inviteCodeList
     */
	public void setInviteCodeList(final Set<InviteCode> inviteCodeList){
		this.inviteCodeList = inviteCodeList;
    }  
    /**
     * Association user_country to Country
     * @return value of country
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="country_id", referencedColumnName="country_id")
	public Country getCountry(){
		return country;
    }  
    /**
     * Association user_country to Country
     * @param country new value to give to country
     */
	public void setCountry(final Country country){
		this.country = country;
    }  
    /**
     * Association role_user to Role
     * @return value of role
     */
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="role_id", referencedColumnName="role_id")
	public Role getRole(){
		return role;
    }  
    /**
     * Association role_user to Role
     * @param role new value to give to role
     */
	public void setRole(final Role role){
		this.role = role;
    }  

	@Override
	public int hashCode(){
	 	// Start with a non-zero constant. Prime is preferred
	    int result = 17;
	
		// Calculating hashcode with all "primitives" attributes
		result = 31 * result + (userId == null? 0 : userId.hashCode());
		result = 31 * result + (username == null? 0 : username.hashCode());
		result = 31 * result + (password == null? 0 : password.hashCode());
		result = 31 * result + (mail == null? 0 : mail.hashCode());
		result = 31 * result + (isActive == null? 0 : isActive.hashCode());
		result = 31 * result + (name == null? 0 : name.hashCode());
		result = 31 * result + (surname == null? 0 : surname.hashCode());
		result = 31 * result + (locale == null? 0 : locale.hashCode());
		result = 31 * result + (birthDate == null? 0 : birthDate.hashCode());
		result = 31 * result + (profilePic == null? 0 : profilePic.hashCode());
		result = 31 * result + (bio == null? 0 : bio.hashCode());
			
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
	    MzkUser otherMzkUser = (MzkUser) other;
	    
		return (userId == null ?  (otherMzkUser.userId == null) : userId.equals(otherMzkUser.userId))
			&& (username == null ?  (otherMzkUser.username == null) : username.equals(otherMzkUser.username))
			&& (password == null ?  (otherMzkUser.password == null) : password.equals(otherMzkUser.password))
			&& (mail == null ?  (otherMzkUser.mail == null) : mail.equals(otherMzkUser.mail))
			&& (isActive == null ?  (otherMzkUser.isActive == null) : isActive.equals(otherMzkUser.isActive))
			&& (name == null ?  (otherMzkUser.name == null) : name.equals(otherMzkUser.name))
			&& (surname == null ?  (otherMzkUser.surname == null) : surname.equals(otherMzkUser.surname))
			&& (locale == null ?  (otherMzkUser.locale == null) : locale.equals(otherMzkUser.locale))
			&& (birthDate == null ?  (otherMzkUser.birthDate == null) : birthDate.equals(otherMzkUser.birthDate))
			&& (profilePic == null ?  (otherMzkUser.profilePic == null) : profilePic.equals(otherMzkUser.profilePic))
			&& (bio == null ?  (otherMzkUser.bio == null) : bio.equals(otherMzkUser.bio))
		;
	}



// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE

    /**
     * Add an invite code to the current user.
     * @param inviteCode the invite code to add.
     */
    public void addInviteCode(InviteCode inviteCode) {
	    inviteCodeList.add(inviteCode);
    }
}