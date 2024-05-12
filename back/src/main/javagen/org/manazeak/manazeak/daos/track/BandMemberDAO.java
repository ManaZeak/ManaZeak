package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.track.Artist;
import org.manazeak.manazeak.entity.track.BandMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Data Access Object for BandMember using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface BandMemberDAO extends JpaRepository<BandMember, Long> {

    /**
     * Get the artist information
     *
     * @param artistId The id of the band.
     * @return The list of member of this band.
     */
    @Query("""
            select mb from BandMember bm
            join bm.member mb
            where bm.band.artistId = :artistId
            order by mb.name
            """)
    List<Artist> getLinkedArtists(@Param("artistId") Long artistId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT