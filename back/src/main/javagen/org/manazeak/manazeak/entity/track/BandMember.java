package org.manazeak.manazeak.entity.track;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Objects;
import java.util.Set;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import javax.persistence.ManyToMany;

import org.manazeak.manazeak.entity.reference.BandRole;

import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.JoinTable;

/**
 * Contains the information about each band member.
 * <p>
 * This file has been automatically generated
 */
@Entity
@Table(name = "band_member")
public class BandMember implements Serializable {
    /**
     * Serial ID
     */
    private static final long serialVersionUID = 1L;

    private Long bandMemberId;
    private Artist band;
    private Artist member;
    private Set<TimeInterval> timeIntervalList;
    private Set<BandRole> bandRoleList;

    /**
     * No comment found in model diagram
     *
     * @return value of bandMemberId
     */
    @Id
    @SequenceGenerator(name = "SEQ_BAND_MEMBER", sequenceName = "SEQ_BAND_MEMBER", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_BAND_MEMBER")
    @Column(name = "band_member_id", nullable = false)
    public Long getBandMemberId() {
        return bandMemberId;
    }

    /**
     * No comment found in model diagram
     *
     * @param bandMemberId new value to give to bandMemberId
     */
    public void setBandMemberId(final Long bandMemberId) {
        this.bandMemberId = bandMemberId;
    }

    /**
     * Association artist_band_member to Artist
     *
     * @return value of band
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "band_id", referencedColumnName = "artist_id")
    public Artist getBand() {
        return band;
    }

    /**
     * Association artist_band_member to Artist
     *
     * @param band new value to give to band
     */
    public void setBand(final Artist band) {
        this.band = band;
    }

    /**
     * Association band_member_artist to Artist
     *
     * @return value of member
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "artist_id")
    public Artist getMember() {
        return member;
    }

    /**
     * Association band_member_artist to Artist
     *
     * @param member new value to give to member
     */
    public void setMember(final Artist member) {
        this.member = member;
    }

    /**
     * Association member_time_interval to TimeInterval
     *
     * @return value of timeIntervalList
     */
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "member_time_interval", joinColumns = @JoinColumn(name = "band_member_id"), inverseJoinColumns = @JoinColumn(name = "interval_id"))
    public Set<TimeInterval> getTimeIntervalList() {
        return timeIntervalList;
    }

    /**
     * Association member_time_interval to TimeInterval
     *
     * @param timeIntervalList new value to give to timeIntervalList
     */
    public void setTimeIntervalList(final Set<TimeInterval> timeIntervalList) {
        this.timeIntervalList = timeIntervalList;
    }

    /**
     * Association member_role to BandRole
     *
     * @return value of bandRoleList
     */
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "member_role", joinColumns = @JoinColumn(name = "band_member_id"), inverseJoinColumns = @JoinColumn(name = "band_role_id"))
    public Set<BandRole> getBandRoleList() {
        return bandRoleList;
    }

    /**
     * Association member_role to BandRole
     *
     * @param bandRoleList new value to give to bandRoleList
     */
    public void setBandRoleList(final Set<BandRole> bandRoleList) {
        this.bandRoleList = bandRoleList;
    }

    @Override
    public int hashCode() {
        // Start with a non-zero constant. Prime is preferred
        int result = 17;

        // Calculating hashcode with all "primitives" attributes
        result = 31 * result + (bandMemberId == null ? 0 : bandMemberId.hashCode());

        return result;
    }

    @Override
    public boolean equals(Object other) {
        // Null object
        if (other == null) {
            return false;
        }

        // Same object
        if (this == other) {
            return true;
        }

        // Wrong type
        if (this.getClass() != other.getClass()) {
            return false;
        }

        // Test all "primitives" attributes
        BandMember otherBandMember = (BandMember) other;

        return (Objects.equals(bandMemberId, otherBandMember.bandMemberId))
                ;
    }


// END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
}